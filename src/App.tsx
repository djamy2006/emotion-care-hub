import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import Booking from "./pages/Booking";
import ExpertDashboard from "./pages/ExpertDashboard";
import Admin from "./pages/Admin";
import Community from "./pages/Community";
import Corporate from "./pages/Corporate";
import Reports from "./pages/Reports";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/expert-dashboard" element={<ExpertDashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/community" element={<Community />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/blog" element={<Blog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
