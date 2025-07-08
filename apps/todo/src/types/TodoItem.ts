import { TodoProject } from './TodoProject';

export interface TodoItem {
  id: number;
  name: string;
  description?: string | null;
  project: TodoProject | null;
  shops?: string | null;
  is_closed: boolean;
  created_at: string;
  updated_at: string;
  completed_at?: string | null;
}
