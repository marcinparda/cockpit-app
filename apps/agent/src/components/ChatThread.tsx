import { useEffect, useRef } from 'react';
import { ModelInfo } from '../api/agent';
import { ConfirmPayload } from '../hooks/useStreamingChat';
import { ConfirmCard } from './ConfirmCard';
import { MessageBubble } from './MessageBubble';
import { ModelSelector } from './ModelSelector';
import { StatusMessage } from './StatusMessage';
import { Message } from '../api/agent';

interface Props {
  conversationTitle: string;
  messages: Message[];
  statusText: string | null;
  pendingConfirm: ConfirmPayload | null;
  isStreaming: boolean;
  models: ModelInfo[];
  selectedModel: string;
  onModelChange: (model: string) => void;
  onSend: (content: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ChatThread({
  conversationTitle,
  messages,
  statusText,
  pendingConfirm,
  isStreaming,
  models,
  selectedModel,
  onModelChange,
  onSend,
  onConfirm,
  onCancel,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, statusText, pendingConfirm]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const value = inputRef.current?.value.trim() ?? '';
    if (!value || isStreaming) return;
    if (inputRef.current) inputRef.current.value = '';
    onSend(value);
  }

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-700 bg-slate-900 shrink-0">
        <h2 className="text-sm font-medium text-slate-200 truncate">{conversationTitle}</h2>
        <ModelSelector
          models={models}
          value={selectedModel}
          onChange={onModelChange}
          disabled={isStreaming}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-1">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <p className="text-slate-400 text-sm">
              Paste a job offer and I'll tailor your CV for it.
            </p>
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {statusText && <StatusMessage text={statusText} />}
        {pendingConfirm && (
          <ConfirmCard
            payload={pendingConfirm}
            onConfirm={onConfirm}
            onCancel={onCancel}
            disabled={isStreaming}
          />
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 py-3 border-t border-slate-700 bg-slate-900">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            rows={3}
            onKeyDown={handleKeyDown}
            placeholder="Paste job offer or type a message… (Enter to send, Shift+Enter for newline)"
            disabled={isStreaming}
            className="flex-1 resize-none bg-slate-800 text-slate-200 text-sm placeholder-slate-500 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
          />
          <button
            onClick={submit}
            disabled={isStreaming}
            className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
