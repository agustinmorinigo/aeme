import { Toaster } from '@aeme/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import setupDateFns from '@/config/date-fns';
import { ThemeProvider } from '@/modules/app/providers/theme-provider';
import useAuthListener from '@/modules/auth/hooks/use-auth-listener';
import router from '@/routes/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

setupDateFns();

export default function App() {
  useAuthListener();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position='top-center' richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
