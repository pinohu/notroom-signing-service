import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RemoteOnlineNotary from "./pages/services/RemoteOnlineNotary";
import MobileNotary from "./pages/services/MobileNotary";
import LoanSigningAgent from "./pages/services/LoanSigningAgent";
import BusinessRetainer from "./pages/services/BusinessRetainer";
import Apostille from "./pages/services/Apostille";
import I9Verification from "./pages/services/I9Verification";
import RegisteredOffice from "./pages/services/RegisteredOffice";
import HowRonWorks from "./pages/resources/HowRonWorks";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ErieCounty from "./pages/areas/ErieCounty";
import CrawfordCounty from "./pages/areas/CrawfordCounty";
import WarrenCounty from "./pages/areas/WarrenCounty";
import StatewideOnline from "./pages/areas/StatewideOnline";
import MercerCounty from "./pages/areas/MercerCounty";
import VenangoCounty from "./pages/areas/VenangoCounty";
import TrackBooking from "./pages/TrackBooking";
import AdminLogin from "./pages/admin/Login";
import AdminBookings from "./pages/admin/Bookings";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
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
          <Route path="/services/i9-verification" element={<I9Verification />} />
          <Route path="/services/registered-office" element={<RegisteredOffice />} />
          
          {/* Resource Pages */}
          <Route path="/resources/how-ron-works" element={<HowRonWorks />} />
          
          {/* Service Area Pages */}
          <Route path="/areas/erie-county" element={<ErieCounty />} />
          <Route path="/areas/crawford-county" element={<CrawfordCounty />} />
          <Route path="/areas/warren-county" element={<WarrenCounty />} />
          <Route path="/areas/mercer-county" element={<MercerCounty />} />
          <Route path="/areas/venango-county" element={<VenangoCounty />} />
          <Route path="/areas/statewide-online" element={<StatewideOnline />} />
          
          {/* Other Pages */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/track-booking" element={<TrackBooking />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          {/* Admin Pages */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
