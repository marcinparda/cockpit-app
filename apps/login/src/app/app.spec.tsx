import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as auth from '@cockpit-app/shared/auth';
import { App } from './app';
import { vi, describe, beforeEach, it, expect } from 'vitest';

vi.mock('@cockpit-app/shared/auth');

const mockIsLoggedIn = auth.isLoggedIn as unknown as ReturnType<typeof vi.fn>;

const mockReplace = vi.fn();
Object.defineProperty(window, 'location', {
  value: { replace: mockReplace },
  writable: true,
});

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to cockpit if user is logged in', async () => {
    mockIsLoggedIn.mockResolvedValue(true);
    render(<App />);
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalled();
    });
  });

  it('renders LoginPage if user is not logged in', async () => {
    mockIsLoggedIn.mockRejectedValue(new Error('Not logged in'));
    const { findByText } = render(<App />);
    // Check for a unique heading in the login page
    expect(await findByText('Login to your account')).toBeInTheDocument();
  });
});
