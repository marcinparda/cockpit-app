export interface ShoppingItem {
  id: number;
  name: string;
  description?: string | null;
  categories?: string | null;
  shops?: string | null;
  is_closed: boolean;
  created_at: string;
  updated_at: string;
  completed_at?: string | null;
}
