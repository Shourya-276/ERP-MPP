import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthPage from "./pages/auth/Login";
import SalesDashboard from "./pages/sales/Dashboard";
import NotFound from "./pages/NotFound";

import ReceptionistDashboard from "./pages/receptionist/Dashboard";
import IpadView from "./pages/receptionist/IpadView";
import NewLeadForm from "./pages/receptionist/new-lead/NewLeadForm";

import ForgotPassword from "./pages/auth/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<SalesDashboard />} />
            <Route path="/sales" element={<SalesDashboard />} />
            <Route path="/receptionist" element={<ReceptionistDashboard />} />
            <Route path="/receptionist/ipad-view" element={<IpadView />} />
            <Route path="/receptionist/new-lead" element={<NewLeadForm />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
