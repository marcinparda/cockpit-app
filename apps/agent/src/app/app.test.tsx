import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, afterEach, expect, beforeEach } from 'vitest';
import App from './app';
import '@testing-library/jest-dom';
import * as useUserModule from '@cockpit-app/shared-react-data-access';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Mocks for child components and external dependencies to isolate App component logic.
 */
vi.mock('../components/ChatThread', () => ({
  ChatThread: ({ conversationTitle, onSend }: any) => (
    <div data-testid="chat-thread">
      <div data-testid="conversation-title">{conversationTitle}</div>
      <button onClick={() => onSend('test message')}>Send</button>
    </div>
  ),
}));

vi.mock('../components/Sidebar', () => ({
  Sidebar: ({ conversations, onSelect, onCreate }: any) => (
    <div data-testid="sidebar">
      <button onClick={() => onCreate('New Chat', 'claude-sonnet')}>
        Create
      </button>
      {conversations?.map((conv: any) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          data-testid={`conv-${conv.id}`}
        >
          {conv.title}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('../hooks/useConversations', () => ({
  useConversations: () => ({
    conversations: [
      { id: '1', title: 'Test Conversation 1', model: 'claude-sonnet' },
      { id: '2', title: 'Test Conversation 2', model: 'claude-sonnet' },
    ],
    isLoading: false,
    createConversation: vi
      .fn()
      .mockResolvedValue({ id: '3', title: 'New Chat' }),
    deleteConversation: vi.fn().mockResolvedValue(undefined),
  }),
}));

vi.mock('../hooks/useStreamingChat', () => ({
  useStreamingChat: () => ({
    messages: [],
    statusText: null,
    pendingConfirm: null,
    isStreaming: false,
    loadMessages: vi.fn(),
    sendMessage: vi.fn(),
  }),
}));

vi.mock('../api/agent', () => ({
  agentApi: {
    getModels: vi.fn().mockResolvedValue({
      models: [
        { id: 'anthropic/claude-sonnet-4-6', name: 'Claude Sonnet 4.6' },
        { id: 'openai/gpt-4', name: 'GPT-4' },
      ],
      default: 'anthropic/claude-sonnet-4-6',
    }),
  },
}));

// Mock window.location.href
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

describe('Agent App', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    // Reset window.location.href
    window.location.href = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderApp = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );
  };

  it('renders loading state while user is loading', () => {
    vi.spyOn(useUserModule, 'useUser').mockReturnValue({
      isLoading: true,
      data: undefined,
      isError: false,
    } as any);

    renderApp();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects to parda.me when user is not authenticated', async () => {
    vi.spyOn(useUserModule, 'useUser').mockReturnValue({
      isLoading: false,
      data: undefined,
      isError: true,
    } as any);

    renderApp();

    await waitFor(() => {
      expect(window.location.href).toBe('https://parda.me');
    });
  });

  it('redirects to parda.me when user data is null', async () => {
    vi.spyOn(useUserModule, 'useUser').mockReturnValue({
      isLoading: false,
      data: null,
      isError: false,
    } as any);

    renderApp();

    await waitFor(() => {
      expect(window.location.href).toBe('https://parda.me');
    });
  });

  it('renders sidebar and empty state when user is authenticated', () => {
    const userInfo = { name: 'Test User', id: '1' };
    vi.spyOn(useUserModule, 'useUser').mockReturnValue({
      isLoading: false,
      data: userInfo,
      isError: false,
    } as any);

    renderApp();

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(
      screen.getByText('Select or create a conversation to start.'),
    ).toBeInTheDocument();
  });

  it('renders chat thread when a conversation is selected', async () => {
    const userInfo = { name: 'Test User', id: '1' };
    vi.spyOn(useUserModule, 'useUser').mockReturnValue({
      isLoading: false,
      data: userInfo,
      isError: false,
    } as any);

    renderApp();

    // Click on a conversation to select it
    const conv1Button = screen.getByTestId('conv-1');
    conv1Button.click();

    await waitFor(() => {
      expect(screen.getByTestId('chat-thread')).toBeInTheDocument();
      expect(screen.getByTestId('conversation-title')).toHaveTextContent(
        'Test Conversation 1',
      );
    });
  });

  it('renders conversations in sidebar', () => {
    const userInfo = { name: 'Test User', id: '1' };
    vi.spyOn(useUserModule, 'useUser').mockReturnValue({
      isLoading: false,
      data: userInfo,
      isError: false,
    } as any);

    renderApp();

    expect(screen.getByTestId('conv-1')).toBeInTheDocument();
    expect(screen.getByTestId('conv-2')).toBeInTheDocument();
    expect(screen.getByText('Test Conversation 1')).toBeInTheDocument();
    expect(screen.getByText('Test Conversation 2')).toBeInTheDocument();
  });
});
