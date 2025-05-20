export interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  created_at?: string;
  updated_at?: string;
}
