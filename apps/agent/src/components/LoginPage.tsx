import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { login } from '@cockpit-app/common-shared-data-access';

export function LoginPage() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await login(email, password);
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    } catch {
      setError('Invalid email or password');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex h-full items-center justify-center bg-bg-1">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-sm px-6"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-xl font-semibold text-fg-0">Agent</h1>
          <p className="text-sm text-fg-3">Sign in to continue</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-fg-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="username"
              disabled={pending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-line bg-bg-2 px-3 py-2 text-sm text-fg-0 placeholder:text-fg-3 focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-fg-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              disabled={pending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-line bg-bg-2 px-3 py-2 text-sm text-fg-0 placeholder:text-fg-3 focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg-0 hover:bg-accent-hi disabled:opacity-50 transition-colors"
          >
            {pending ? 'Signing in…' : 'Sign in'}
          </button>

          {error && (
            <p className="text-center text-sm text-red-400">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
}
