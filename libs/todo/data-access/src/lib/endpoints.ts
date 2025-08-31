export const TODO_ENDPOINTS = {
  items: () => '/api/v1/todos/items',
  itemById: (id: number) => `/api/v1/todos/items/${id}`,
  projects: () => '/api/v1/todos/projects',
  projectById: (id: number) => `/api/v1/todos/projects/${id}`,
  projectCollaborators: (projectId: number) => `/api/v1/todos/projects/${projectId}/collaborators`,
  projectCollaboratorById: (projectId: number, userId: string) => `/api/v1/todos/projects/${projectId}/collaborators/${userId}`,
} as const;
