import {
  currentUserSchema,
  simpleRefreshResponseSchema,
  loginResponseSchema,
  logoutResponseSchema,
  passwordChangeResponseSchema,
} from './schemas';

// Mock data for each schema
const userInfo = {
  user_id: '123',
  email: 'test@example.com',
  is_active: true,
  password_changed: false,
  created_at: '2023-01-01T00:00:00Z',
};

const simpleRefresh = { detail: 'Refreshed' };
const login = { detail: 'Logged in' };
const logout = { detail: 'Logged out' };
const passwordChange = { detail: 'Password changed' };

describe('schemas', () => {
  it('validates currentUserSchema', () => {
    expect(currentUserSchema.parse(userInfo)).toEqual(userInfo);
  });

  it('validates simpleRefreshResponseSchema', () => {
    expect(simpleRefreshResponseSchema.parse(simpleRefresh)).toEqual(
      simpleRefresh,
    );
  });

  it('validates loginResponseSchema', () => {
    expect(loginResponseSchema.parse(login)).toEqual(login);
  });

  it('validates logoutResponseSchema', () => {
    expect(logoutResponseSchema.parse(logout)).toEqual(logout);
  });

  it('validates passwordChangeResponseSchema', () => {
    expect(passwordChangeResponseSchema.parse(passwordChange)).toEqual(
      passwordChange,
    );
  });

  it('throws on invalid schema', () => {
    expect(() => currentUserSchema.parse({})).toThrow();
  });
});
