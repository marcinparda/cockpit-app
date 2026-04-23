import { useCallback, useRef, useState } from 'react';
import { agentApi, Message } from '../api/agent';

export interface ConfirmPayload {
  action: string;
  preset_name: string;
  preview: Record<string, unknown>;
}

export function useStreamingChat(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [statusSteps, setStatusSteps] = useState<string[]>([]);
  const [pendingConfirm, setPendingConfirm] = useState<ConfirmPayload | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const loadMessages = useCallback(async (convId: string) => {
    const msgs = await agentApi.getMessages(convId);
    setMessages(msgs);
    setPendingConfirm(null);
    setStatusSteps([]);
  }, []);

  const sendMessage = useCallback(
    async (content: string, convIdOverride?: string) => {
      const targetId = convIdOverride ?? conversationId;
      if (!targetId || isStreaming) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        conversation_id: targetId,
        role: 'user',
        content,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setPendingConfirm(null);
      setStatusSteps([]);
      setIsStreaming(true);

      abortRef.current = new AbortController();

      let assistantContent = '';
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        conversation_id: targetId,
        role: 'assistant',
        content: '',
        created_at: new Date().toISOString(),
      };

      try {
        const res = await agentApi.sendMessageStream(targetId, content);
        if (!res.body) throw new Error('No response body');

        setMessages((prev) => [...prev, assistantMsg]);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          let event = '';
          for (const line of lines) {
            if (line.startsWith('event: ')) {
              event = line.slice(7).trim();
            } else if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6));
              if (event === 'status') {
                setStatusSteps((prev) => [...prev, data.text as string]);
              } else if (event === 'chunk') {
                assistantContent += data.text as string;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id ? { ...m, content: assistantContent } : m
                  )
                );
              } else if (event === 'confirm_required') {
                setPendingConfirm(data as ConfirmPayload);
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id
                      ? {
                          ...m,
                          content: `I've prepared a tailored CV preset: **${(data as ConfirmPayload).preset_name}**. Review the preview below and confirm to save it.`,
                        }
                      : m
                  )
                );
              } else if (event === 'done') {
                setStatusSteps([]);
              } else if (event === 'error') {
                assistantContent += data.text as string;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id ? { ...m, content: assistantContent } : m
                  )
                );
              }
              event = '';
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id
                ? { ...m, content: 'Error: failed to get response.' }
                : m
            )
          );
        }
      } finally {
        setIsStreaming(false);
        setStatusSteps([]);
      }
    },
    [conversationId, isStreaming]
  );

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    setMessages([]);
    setStatusSteps([]);
    setPendingConfirm(null);
  }, []);

  return { messages, statusSteps, pendingConfirm, isStreaming, loadMessages, sendMessage, abort, reset };
}
