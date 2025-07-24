import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

/**
 * Unit tests for Button component
 * @see Button.tsx
 */
describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-destructive');
    expect(btn.className).toContain('h-10');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('renders as child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/">Link</a>
      </Button>
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('forwards additional props', () => {
    render(<Button data-testid="custom-btn">Test</Button>);
    expect(screen.getByTestId('custom-btn')).toBeInTheDocument();
  });
});
