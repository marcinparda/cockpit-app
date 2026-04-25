import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@cockpit-app/shared-react-data-access';
import { agentApi, ModelInfo } from '../api/agent';
import { ChatThread } from '../components/ChatThread';
import { Sidebar } from '../components/Sidebar';
import { useConversations } from '../hooks/useConversations';
import { useStreamingChat } from '../hooks/useStreamingChat';

export default function App() {
  const { isLoading: userLoading, data: userInfo, isError } = useUser({
    withRedirect: false,
    options: { retry: false },
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('anthropic/claude-sonnet-4-6');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const skipLoadRef = useRef<string | null>(null);

  const { data: modelData } = useQuery({
    queryKey: ['agent-models'],
    queryFn: agentApi.getModels,
    enabled: !!userInfo,
  });

  const models: ModelInfo[] = modelData?.models ?? [];
  const defaultModel = modelData?.default ?? 'anthropic/claude-sonnet-4-6';

  const { conversations, isLoading: convsLoading, createConversation, deleteConversation } =
    useConversations();

  const { messages, statusSteps, pendingConfirm, isStreaming, loadMessages, sendMessage, abort, reset } =
    useStreamingChat(selectedId);

  useEffect(() => {
    if (selectedId) {
      if (skipLoadRef.current === selectedId) {
        skipLoadRef.current = null;
        return;
      }
      loadMessages(selectedId);
    }
  }, [selectedId, loadMessages]);

  useEffect(() => {
    if (modelData) setSelectedModel(modelData.default);
  }, [modelData]);

  if (isError || (!userLoading && !userInfo)) {
    window.location.href = 'https://parda.me';
    return null;
  }

  if (userLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-bg-1">
        <div className="text-fg-3 text-sm font-mono">Loading…</div>
      </div>
    );
  }

  async function handleFirstSend(content: string) {
    if (!content.trim()) return;
    const title = content.trim().slice(0, 60) || 'New conversation';
    const conv = await createConversation({ title, model: selectedModel });
    skipLoadRef.current = conv.id;
    setSelectedId(conv.id);
    setSidebarOpen(false);
    sendMessage(content.trim(), conv.id);
  }

  async function handleDelete(id: string) {
    await deleteConversation(id);
    if (selectedId === id) {
      setSelectedId(null);
      reset();
    }
  }

  function handleConfirm() {
    sendMessage('yes');
  }

  function handleCancel() {
    sendMessage('no');
  }

  function handleNew() {
    setSelectedId(null);
    reset();
    setSidebarOpen(false);
  }

  function handleSelect(id: string) {
    setSelectedId(id);
    setSidebarOpen(false);
  }

  const selectedConv = conversations.find((c) => c.id === selectedId);

  return (
    <div className="flex h-full bg-bg-1 text-fg-0 font-sans overflow-hidden">
      {/* Sidebar overlay backdrop on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        conversations={conversations}
        selectedId={selectedId}
        isLoading={convsLoading}
        userEmail={userInfo?.email ?? ''}
        sidebarOpen={sidebarOpen}
        onSelect={handleSelect}
        onNew={handleNew}
        onDelete={handleDelete}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex flex-1 min-w-0 flex-col h-full">
        <ChatThread
          conversationTitle={selectedConv?.title ?? null}
          messages={messages}
          statusSteps={statusSteps}
          pendingConfirm={pendingConfirm}
          isStreaming={isStreaming}
          models={models}
          selectedModel={selectedModel}
          defaultModel={defaultModel}
          onModelChange={setSelectedModel}
          onSend={selectedId ? sendMessage : handleFirstSend}
          onAbort={abort}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onMenuOpen={() => setSidebarOpen(true)}
        />
      </main>
    </div>
  );
}
