import { Category } from './index';

describe('ApiTypes', () => {
  it('should allow creating a Category type object', () => {
    const category: Category = {
      name: 'Groceries',
      parent_id: null,
      id: 1,
      created_at: '2025-08-02T12:00:00Z',
      updated_at: '2025-08-02T12:00:00Z',
    };
    expect(category).toBeDefined();
    expect(category.name).toBe('Groceries');
    expect(category.id).toBe(1);
  });
});
