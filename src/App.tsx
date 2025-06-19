
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Waitlist from "./pages/Waitlist";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { CozyThemeProvider } from "./components/CozyThemeProvider";
import { usePerformance } from "./hooks/usePerformance";
import { useSession } from "./hooks/useSession";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const AppContent = () => {
  const { metrics, isLoadingSlow } = usePerformance();
  const { session } = useSession();

  useEffect(() => {
    // Log performance metrics for monitoring
    if (metrics.loadTime > 0) {
      console.log('App Performance Metrics:', metrics);
    }
  }, [metrics]);

  useEffect(() => {
    // Warn users about slow loading
    if (isLoadingSlow) {
      console.warn('App is loading slowly. Consider optimizing bundle size.');
    }
  }, [isLoadingSlow]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CozyThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/waitlist" element={<Waitlist />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CozyThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

const App = () => (
  <ErrorBoundary>
    <AppContent />
  </ErrorBoundary>
);

export default App;
