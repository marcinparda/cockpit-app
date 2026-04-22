import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { agentApi, Conversation } from '../api/agent';

const QUERY_KEY = ['agent-conversations'] as const;

export function useConversations() {
  const queryClient = useQueryClient();

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: agentApi.getConversations,
  });

  const createMutation = useMutation({
    mutationFn: ({ title, model }: { title: string; model: string }) =>
      agentApi.createConversation(title, model),
    onSuccess: (newConv) => {
      queryClient.setQueryData<Conversation[]>(QUERY_KEY, (prev = []) => [newConv, ...prev]);
    },
  });

  const renameMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      agentApi.renameConversation(id, title),
    onSuccess: (updated) => {
      queryClient.setQueryData<Conversation[]>(QUERY_KEY, (prev = []) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => agentApi.deleteConversation(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Conversation[]>(QUERY_KEY, (prev = []) =>
        prev.filter((c) => c.id !== id)
      );
    },
  });

  return {
    conversations,
    isLoading,
    createConversation: createMutation.mutateAsync,
    renameConversation: renameMutation.mutateAsync,
    deleteConversation: deleteMutation.mutateAsync,
  };
}
