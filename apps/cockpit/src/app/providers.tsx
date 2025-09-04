import { tanstackQueryClient } from '@cockpit-app/shared-react-data-access';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { TooltipProvider } from '@cockpit-app/shared-react-ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={tanstackQueryClient}>
      <BrowserRouter>
        <TooltipProvider delayDuration={200} skipDelayDuration={100}>
          {children}
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
