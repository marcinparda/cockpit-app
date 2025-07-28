import { render, screen } from '@testing-library/react';
import { vi, describe, it, afterEach, expect } from 'vitest';
import App from './app';
import '@testing-library/jest-dom';
import * as useUserModule from '@cockpit-app/shared-react-data-access';

/**
 * Mocks for child components and icons to isolate App component logic.
 */
vi.mock('@cockpit-app/cockpit-ui', () => ({
  AppLayout: ({ header, children }: any) => (
    <div>
      <div data-testid="header">{header}</div>
      <div data-testid="layout-children">{children}</div>
    </div>
  ),
  TopNavBar: ({ navLinks, brandName, BrandIcon, rightContent }: any) => (
    <nav data-testid="top-navbar">
      <span>{brandName}</span>
      <span>{navLinks?.map((l: any) => l.name).join(',')}</span>
      <span>{BrandIcon ? 'icon' : ''}</span>
      <span>{rightContent ? 'rightContent' : ''}</span>
    </nav>
  ),
}));
vi.mock('./apps/apps', () => ({
  default: () => <div data-testid="apps-page">AppsPage</div>,
}));
vi.mock('./components/TopNavBarRighContent', () => ({
  TopNavBarRighContent: ({ userInfo }: any) => (
    <div data-testid="top-nav-bar-right-content">
      {userInfo?.name || 'NoUser'}
    </div>
  ),
}));
vi.mock('./skeleton', () => ({
  AppSkeleton: () => <div data-testid="app-skeleton">Loading...</div>,
}));

describe('App', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders AppSkeleton while loading', () => {
    vi.spyOn(useUserModule, 'useUser').mockReturnValue({
      isLoading: true,
      data: undefined,
    } as any);
    render(<App />);
    expect(screen.getByTestId('app-skeleton')).toBeInTheDocument();
  });

  it('renders navigation links in TopNavBar', () => {
    const userInfo = { name: 'NavTest' };
    vi.spyOn(useUserModule, 'useUser').mockReturnValue({
      isLoading: false,
      data: userInfo,
    } as any);
    render(<App />);
    expect(screen.getByTestId('top-navbar')).toHaveTextContent(
      'Apps,Dashboard'
    );
  });
});
