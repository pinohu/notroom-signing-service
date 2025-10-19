import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RemoteOnlineNotary from "./pages/services/RemoteOnlineNotary";
import MobileNotary from "./pages/services/MobileNotary";
import LoanSigningAgent from "./pages/services/LoanSigningAgent";
import BusinessRetainer from "./pages/services/BusinessRetainer";
import Apostille from "./pages/services/Apostille";
import HowRonWorks from "./pages/resources/HowRonWorks";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Service Pages */}
          <Route path="/services/remote-online-notary" element={<RemoteOnlineNotary />} />
          <Route path="/services/mobile-notary" element={<MobileNotary />} />
          <Route path="/services/loan-signing-agent" element={<LoanSigningAgent />} />
          <Route path="/services/business-retainer" element={<BusinessRetainer />} />
          <Route path="/services/apostille" element={<Apostille />} />
          
          {/* Resource Pages */}
          <Route path="/resources/how-ron-works" element={<HowRonWorks />} />
          
          {/* Other Pages */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
