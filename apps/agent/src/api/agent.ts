import { environments } from '@cockpit-app/shared-utils';

const BASE = `${environments.apiUrl}/api/v1/agent`;

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  model: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  extra_data?: unknown;
  created_at: string;
}

export interface ModelInfo {
  id: string;
  label: string;
}

export interface ModelListResponse {
  models: ModelInfo[];
  default: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { credentials: 'include', ...init });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export const agentApi = {
  getModels: () => request<ModelListResponse>(`${BASE}/models`),

  getConversations: () => request<Conversation[]>(`${BASE}/conversations`),

  createConversation: (title: string, model: string) =>
    request<Conversation>(`${BASE}/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, model }),
    }),

  renameConversation: (id: string, title: string) =>
    request<Conversation>(`${BASE}/conversations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    }),

  deleteConversation: (id: string) =>
    fetch(`${BASE}/conversations/${id}`, { method: 'DELETE', credentials: 'include' }),

  getMessages: (conversationId: string) =>
    request<Message[]>(`${BASE}/conversations/${conversationId}/messages`),

  sendMessage: (conversationId: string, content: string): EventSource => {
    // SSE via POST requires fetch — we use a custom approach:
    // POST the message then open SSE-like streaming via fetch
    throw new Error('Use sendMessageStream instead');
  },

  sendMessageStream: (conversationId: string, content: string) =>
    fetch(`${BASE}/conversations/${conversationId}/messages`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    }),
};
