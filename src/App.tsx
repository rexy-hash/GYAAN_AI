
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Discoveries from "./pages/Discoveries";
import CategoryView from "./pages/CategoryView";
import Subscriptions from "./pages/Subscriptions";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useMemo } from "react";

// Create a new query client with optimized settings
const App = () => {
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes default stale time
        cacheTime: 10 * 60 * 1000, // 10 minutes cache time
        refetchOnWindowFocus: false, // Don't refetch on window focus for better performance
        retry: 1, // Only retry once to avoid excessive API calls
      },
    },
  }), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/discoveries" element={<Discoveries />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/category/:categoryId" element={<CategoryView />} />
                </Route>
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
