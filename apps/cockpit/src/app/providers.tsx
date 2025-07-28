import { tanstackQueryClient } from '@cockpit-app/cockpit-data-access';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={tanstackQueryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}
