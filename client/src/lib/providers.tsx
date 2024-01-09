"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  
  queryClient.setDefaultOptions({
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
