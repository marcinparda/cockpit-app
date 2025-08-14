import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UserInfoResponse } from '@cockpit-app/api-types';

vi.mock('@cockpit-app/shared-utils', () => ({
  environments: { apiUrl: 'https://api.example.com' },
}));

// Define the mock inside the factory to avoid hoisting TDZ issues
vi.mock('./httpClient', () => ({
  default: { get: vi.fn() },
}));

import { currentUserService } from './current-user.service';
import httpClient from './httpClient';

// Access the mocked get function after imports
const getMock = (httpClient as unknown as { get: ReturnType<typeof vi.fn> }).get;

describe('currentUserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch current user info successfully', async () => {
    const mockUser: UserInfoResponse = {
      user_id: '11111111-1111-1111-1111-111111111111',
      email: 'user@test.com',
      is_active: true,
      password_changed: false,
      created_at: '2025-01-01T00:00:00.000Z',
    };

    getMock.mockResolvedValueOnce({ data: mockUser });

    const result = await currentUserService.getCurrentUserInfo();

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith(
      'https://api.example.com/api/v1/auth/me',
    );
    expect(result).toBe(mockUser);
  });

  it('should log error and rethrow when request fails', async () => {
    const error = new Error('Network error');
    getMock.mockRejectedValueOnce(error);
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(function log() { /* silent */ });

    await expect(currentUserService.getCurrentUserInfo()).rejects.toThrow(
      error,
    );

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalled();
    const firstCallArgs = consoleSpy.mock.calls[0];
    expect(firstCallArgs[0]).toContain('Error fetching user data');

    consoleSpy.mockRestore();
  });
});
