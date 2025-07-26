import { cn, Label, Input, Button } from '@cockpit-app/shared/react-ui';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@cockpit-app/shared/auth';
import { REDIRECT_URL } from '../consts/environments';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [state, formAction] = useFormState(
    async (_prevState: unknown, formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const loggedIn = await login(email, password);
      if (loggedIn) {
        window.location.replace(REDIRECT_URL);
        return { error: null, success: true };
      }
      return { error: 'Invalid email or password', success: false };
    },
    { error: null, success: false }
  );

  const { pending } = useFormStatus();

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      action={formAction}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            disabled={pending}
            autoComplete="username"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            disabled={pending}
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Logging in...' : 'Login'}
        </Button>
        {state.error && (
          <div className="text-red-500 text-sm text-center">{state.error}</div>
        )}
        {state.success && (
          <div className="text-green-600 text-sm text-center">
            Login successful!
          </div>
        )}
      </div>
    </form>
  );
}
