import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      onError: (error) => {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error('Query error:', message);
      }
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error('Mutation error:', message);
      }
    }
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}