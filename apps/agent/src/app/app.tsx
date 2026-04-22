import { useEffect, useState } from 'react';
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

  const { data: modelData } = useQuery({
    queryKey: ['agent-models'],
    queryFn: agentApi.getModels,
    enabled: !!userInfo,
  });

  const models: ModelInfo[] = modelData?.models ?? [];
  const defaultModel = modelData?.default ?? 'anthropic/claude-sonnet-4-6';

  const { conversations, isLoading: convsLoading, createConversation, deleteConversation } =
    useConversations();

  const { messages, statusText, pendingConfirm, isStreaming, loadMessages, sendMessage } =
    useStreamingChat(selectedId);

  useEffect(() => {
    if (selectedId) {
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
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-slate-400 text-sm">Loading...</div>
      </div>
    );
  }

  async function handleCreate(title: string, model: string) {
    const conv = await createConversation({ title, model });
    setSelectedId(conv.id);
    setSelectedModel(model);
  }

  async function handleDelete(id: string) {
    await deleteConversation(id);
    if (selectedId === id) setSelectedId(null);
  }

  function handleConfirm() {
    sendMessage('yes');
  }

  function handleCancel() {
    sendMessage('no');
  }

  const selectedConv = conversations.find((c) => c.id === selectedId);

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar
        conversations={conversations}
        selectedId={selectedId}
        isLoading={convsLoading}
        defaultModel={defaultModel}
        onSelect={setSelectedId}
        onCreate={handleCreate}
        onDelete={handleDelete}
      />

      <main className="flex flex-1 min-w-0 h-full">
        {selectedId && selectedConv ? (
          <ChatThread
            conversationTitle={selectedConv.title}
            messages={messages}
            statusText={statusText}
            pendingConfirm={pendingConfirm}
            isStreaming={isStreaming}
            models={models}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            onSend={sendMessage}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center text-slate-500 text-sm">
            Select or create a conversation to start.
          </div>
        )}
      </main>
    </div>
  );
}
