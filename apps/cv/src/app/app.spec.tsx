import { render } from '@testing-library/react';
import App from './app';

vi.mock('@cockpit-app/shared-react-data-access', () => ({
  useUser: () => ({
    isLoading: false,
    isError: false,
    data: { id: 'test-user', name: 'Test User' },
  }),
}));

vi.mock('../components/editor/CVEditor', () => ({
  CVEditor: () => <div data-testid="cv-editor" />,
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
