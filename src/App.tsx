import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthPage from "./pages/auth/Login";
import SalesDashboard from "./pages/sales/Dashboard";
import SalesLeadsPage from "./pages/sales/Leads";
import SiteVisitPage from "./pages/sales/SiteVisit";
import RevisitPage from "./pages/sales/Revisit";
import SalesReportPage from "./pages/sales/SalesReport";
import PaymentPage from "./pages/sales/Payment";
import CancellationPage from "./pages/sales/Cancellation";
import RegistrationPage from "./pages/sales/Registration";
import IncentivePage from "./pages/sales/Incentive";
import ProjectDashboard from "./pages/sales/ProjectDashboard";
import EditLeadPage from "./pages/sales/EditLead";
import NotFound from "./pages/NotFound";

import ReceptionistDashboard from "./pages/receptionist/Dashboard";
import IpadView from "./pages/receptionist/IpadView";
import NewLeadForm from "./pages/receptionist/new-lead/NewLeadForm";

import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

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
            <Route path="/sales/leads/edit/:id" element={<EditLeadPage />} />
            <Route path="/sales/leads" element={<SalesLeadsPage />} />
            <Route path="/sales/site-visit" element={<SiteVisitPage />} />
            <Route path="/sales/revisit" element={<RevisitPage />} />
            <Route path="/sales/report" element={<SalesReportPage />} />
            <Route path="/sales/payment" element={<PaymentPage />} />
            <Route path="/sales/cancellation" element={<CancellationPage />} />
            <Route path="/sales/registration" element={<RegistrationPage />} />
            <Route path="/sales/incentive" element={<IncentivePage />} />
            <Route path="/projects/dashboard" element={<ProjectDashboard />} />
            <Route path="/receptionist" element={<ReceptionistDashboard />} />
            <Route path="/receptionist/ipad-view" element={<IpadView />} />
            <Route path="/receptionist/new-lead" element={<NewLeadForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
