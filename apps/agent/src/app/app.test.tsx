import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import App from './app';
import '@testing-library/jest-dom';
import * as useUserModule from '@cockpit-app/shared-react-data-access';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('../components/ChatThread', () => ({
  ChatThread: () => <div data-testid="chat-thread" />,
}));

vi.mock('../components/Sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar" />,
}));

vi.mock('../hooks/useConversations', () => ({
  useConversations: () => ({
    conversations: [],
    isLoading: false,
    createConversation: vi.fn(),
    deleteConversation: vi.fn(),
  }),
}));

vi.mock('../hooks/useStreamingChat', () => ({
  useStreamingChat: () => ({
    messages: [],
    statusSteps: [],
    pendingConfirm: null,
    isStreaming: false,
    loadMessages: vi.fn(),
    sendMessage: vi.fn(),
    abort: vi.fn(),
    reset: vi.fn(),
  }),
}));

vi.mock('../api/agent', () => ({
  agentApi: {
    getModels: vi.fn().mockResolvedValue({
      models: [],
      default: 'anthropic/claude-sonnet-4-6',
    }),
  },
}));

describe('Agent App', () => {
  it('renders sidebar and chat thread for authenticated user', () => {
    vi.spyOn(useUserModule, 'useUser').mockReturnValue({
      isLoading: false,
      data: { name: 'Test User', id: '1', email: 'test@example.com' },
      isError: false,
    } as any);

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('chat-thread')).toBeInTheDocument();
  });
});
