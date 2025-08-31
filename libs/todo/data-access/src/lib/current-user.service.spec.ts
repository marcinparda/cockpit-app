import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UserInfoResponse } from '@cockpit-app/api-types';

vi.mock('@cockpit-app/common-shared-data-access', () => ({
  getCurrentUser: vi.fn(),
}));

import { currentUserService } from './current-user.service';
import { getCurrentUser } from '@cockpit-app/common-shared-data-access';

const getCurrentUserMock = vi.mocked(getCurrentUser);

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

    getCurrentUserMock.mockResolvedValueOnce(mockUser);

    const result = await currentUserService.getCurrentUserInfo();

    expect(getCurrentUserMock).toHaveBeenCalledTimes(1);
    expect(getCurrentUserMock).toHaveBeenCalledWith();
    expect(result).toBe(mockUser);
  });

  it('should rethrow when request fails', async () => {
    const error = new Error('Network error');
    getCurrentUserMock.mockRejectedValueOnce(error);

    await expect(currentUserService.getCurrentUserInfo()).rejects.toThrow(
      error,
    );

    expect(getCurrentUserMock).toHaveBeenCalledTimes(1);
  });
});
