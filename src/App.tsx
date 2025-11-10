import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RemoteOnlineNotary from "./pages/services/RemoteOnlineNotary";
import MobileNotary from "./pages/services/MobileNotary";
import LoanSigningAgent from "./pages/services/LoanSigningAgent";
import BusinessRetainer from "./pages/services/BusinessRetainer";
import Apostille from "./pages/services/Apostille";
import I9Verification from "./pages/services/I9Verification";
import RegisteredOffice from "./pages/services/RegisteredOffice";
import HealthcareFacility from "./pages/services/HealthcareFacility";
import CertifiedCopies from "./pages/services/CertifiedCopies";


import WitnessService from "./pages/services/WitnessService";
import PassportPhotos from "./pages/services/PassportPhotos";
import TranslationCertification from "./pages/services/TranslationCertification";
import VehicleTitleTransfer from "./pages/services/VehicleTitleTransfer";
import VirtualMailbox from "./pages/services/VirtualMailbox";
import UCCFiling from "./pages/services/UCCFiling";
import DocumentRetrieval from "./pages/services/DocumentRetrieval";
import HowRonWorks from "./pages/resources/HowRonWorks";
import Pricing from "./pages/Pricing";
import Calculator from "./pages/Calculator";
import Subscriptions from "./pages/Subscriptions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Agreements from "./pages/legal/Agreements";
import ErieCounty from "./pages/areas/ErieCounty";
import CrawfordCounty from "./pages/areas/CrawfordCounty";
import WarrenCounty from "./pages/areas/WarrenCounty";
import StatewideOnline from "./pages/areas/StatewideOnline";
import MercerCounty from "./pages/areas/MercerCounty";
import VenangoCounty from "./pages/areas/VenangoCounty";
import OilCity from "./pages/areas/cities/OilCity";
import Franklin from "./pages/areas/cities/Franklin";
import Sugarcreek from "./pages/areas/cities/Sugarcreek";
import Clintonville from "./pages/areas/cities/Clintonville";
import Emlenton from "./pages/areas/cities/Emlenton";
import Sharon from "./pages/areas/cities/Sharon";
import Hermitage from "./pages/areas/cities/Hermitage";
import GroveCity from "./pages/areas/cities/GroveCity";
import Mercer from "./pages/areas/cities/Mercer";
import Farrell from "./pages/areas/cities/Farrell";
import Sharpsville from "./pages/areas/cities/Sharpsville";
import Greenville from "./pages/areas/cities/Greenville";
import Erie from "./pages/areas/cities/Erie";
import Edinboro from "./pages/areas/cities/Edinboro";
import NorthEast from "./pages/areas/cities/NorthEast";
import Girard from "./pages/areas/cities/Girard";
import Corry from "./pages/areas/cities/Corry";
import Waterford from "./pages/areas/cities/Waterford";
import Meadville from "./pages/areas/cities/Meadville";
import Titusville from "./pages/areas/cities/Titusville";
import Warren from "./pages/areas/cities/Warren";
import Youngsville from "./pages/areas/cities/Youngsville";
import Sheffield from "./pages/areas/cities/Sheffield";
import CambridgeSprings from "./pages/areas/cities/CambridgeSprings";
import Linesville from "./pages/areas/cities/Linesville";
import ConneautLake from "./pages/areas/cities/ConneautLake";
import Cochranton from "./pages/areas/cities/Cochranton";
import Saegertown from "./pages/areas/cities/Saegertown";
import Spartansburg from "./pages/areas/cities/Spartansburg";
import GuysMills from "./pages/areas/cities/GuysMills";
import BloomingValley from "./pages/areas/cities/BloomingValley";
import Harmonsburg from "./pages/areas/cities/Harmonsburg";
import VenangoCrawford from "./pages/areas/cities/VenangoCrawford";
import Albion from "./pages/areas/cities/Albion";
import McKean from "./pages/areas/cities/McKean";
import SugarGrove from "./pages/areas/cities/SugarGrove";
import Tidioute from "./pages/areas/cities/Tidioute";
import Clarendon from "./pages/areas/cities/Clarendon";
import BearLake from "./pages/areas/cities/BearLake";
import Russell from "./pages/areas/cities/Russell";
import NorthWarren from "./pages/areas/cities/NorthWarren";
import Kinzua from "./pages/areas/cities/Kinzua";
import Irvine from "./pages/areas/cities/Irvine";
import Pittsfield from "./pages/areas/cities/Pittsfield";
import Townville from "./pages/areas/cities/Townville";
import Conneautville from "./pages/areas/cities/Conneautville";
import Hydetown from "./pages/areas/cities/Hydetown";
import Riceville from "./pages/areas/cities/Riceville";
import ChandlersValley from "./pages/areas/cities/ChandlersValley";
import SpringCreek from "./pages/areas/cities/SpringCreek";
import Millcreek from "./pages/areas/cities/Millcreek";
import Harborcreek from "./pages/areas/cities/Harborcreek";
import Fairview from "./pages/areas/cities/Fairview";
import Wesleyville from "./pages/areas/cities/Wesleyville";
import LawrencePark from "./pages/areas/cities/LawrencePark";
import UnionCity from "./pages/areas/cities/UnionCity";
import LakeCity from "./pages/areas/cities/LakeCity";
import Wattsburg from "./pages/areas/cities/Wattsburg";
import Stoneboro from "./pages/areas/cities/Stoneboro";
import SandyLake from "./pages/areas/cities/SandyLake";
import Clark from "./pages/areas/cities/Clark";
import CranberryTownship from "./pages/areas/cities/CranberryTownship";
import Polk from "./pages/areas/cities/Polk";
import Rouseville from "./pages/areas/cities/Rouseville";
import Cooperstown from "./pages/areas/cities/Cooperstown";
import Utica from "./pages/areas/cities/Utica";
import Pleasantville from "./pages/areas/cities/Pleasantville";
import TrackBooking from "./pages/TrackBooking";
import AdminLogin from "./pages/admin/Login";
import AdminBookings from "./pages/admin/Bookings";
import AdminCallScaler from "./pages/admin/CallScaler";
import AdminVoiceAgent from "./pages/admin/VoiceAgent";
import AdminWhatsAppConfig from "./pages/admin/WhatsAppConfig";
import AdminAutomationFlows from "./pages/admin/AutomationFlows";
import LogoProcessor from "./pages/LogoProcessor";
import AllBadgesProcessor from "./pages/AllBadgesProcessor";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import Sitemap from "./pages/Sitemap";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />
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
          <Route path="/crop" element={<RegisteredOffice />} />
          <Route path="/services/healthcare-facility" element={<HealthcareFacility />} />
          <Route path="/services/certified-copies" element={<CertifiedCopies />} />
          
          
          <Route path="/services/witness-service" element={<WitnessService />} />
          <Route path="/services/passport-photos" element={<PassportPhotos />} />
          <Route path="/services/translation-certification" element={<TranslationCertification />} />
          <Route path="/services/vehicle-title-transfer" element={<VehicleTitleTransfer />} />
          <Route path="/services/virtual-mailbox" element={<VirtualMailbox />} />
          <Route path="/services/ucc-filing" element={<UCCFiling />} />
          <Route path="/services/document-retrieval" element={<DocumentRetrieval />} />
          
          {/* Resource Pages */}
          <Route path="/resources/how-ron-works" element={<HowRonWorks />} />
          
          {/* Service Area Pages */}
          <Route path="/areas/erie-county" element={<ErieCounty />} />
          <Route path="/areas/crawford-county" element={<CrawfordCounty />} />
          <Route path="/areas/warren-county" element={<WarrenCounty />} />
          <Route path="/areas/mercer-county" element={<MercerCounty />} />
          <Route path="/areas/venango-county" element={<VenangoCounty />} />
          <Route path="/areas/statewide-online" element={<StatewideOnline />} />
          
          {/* City Pages - Venango County */}
          <Route path="/areas/oil-city-pa" element={<OilCity />} />
          <Route path="/areas/franklin-pa" element={<Franklin />} />
          <Route path="/areas/sugarcreek-pa" element={<Sugarcreek />} />
          <Route path="/areas/clintonville-pa" element={<Clintonville />} />
          <Route path="/areas/emlenton-pa" element={<Emlenton />} />
          
          {/* City Pages - Mercer County */}
          <Route path="/areas/sharon-pa" element={<Sharon />} />
          <Route path="/areas/hermitage-pa" element={<Hermitage />} />
          <Route path="/areas/grove-city-pa" element={<GroveCity />} />
          <Route path="/areas/mercer-pa" element={<Mercer />} />
          <Route path="/areas/farrell-pa" element={<Farrell />} />
          <Route path="/areas/sharpsville-pa" element={<Sharpsville />} />
          <Route path="/areas/greenville-pa" element={<Greenville />} />
          
          {/* City Pages - Erie County */}
          <Route path="/areas/erie-pa" element={<Erie />} />
          <Route path="/areas/edinboro-pa" element={<Edinboro />} />
          <Route path="/areas/north-east-pa" element={<NorthEast />} />
          <Route path="/areas/girard-pa" element={<Girard />} />
          <Route path="/areas/corry-pa" element={<Corry />} />
          <Route path="/areas/waterford-pa" element={<Waterford />} />
          
          {/* City Pages - Crawford County */}
          <Route path="/areas/meadville-pa" element={<Meadville />} />
          <Route path="/areas/titusville-pa" element={<Titusville />} />
          <Route path="/areas/cambridge-springs-pa" element={<CambridgeSprings />} />
          <Route path="/areas/linesville-pa" element={<Linesville />} />
          <Route path="/areas/conneaut-lake-pa" element={<ConneautLake />} />
          <Route path="/areas/cochranton-pa" element={<Cochranton />} />
          <Route path="/areas/saegertown-pa" element={<Saegertown />} />
          <Route path="/areas/spartansburg-pa" element={<Spartansburg />} />
          <Route path="/areas/guys-mills-pa" element={<GuysMills />} />
          <Route path="/areas/blooming-valley-pa" element={<BloomingValley />} />
          <Route path="/areas/harmonsburg-pa" element={<Harmonsburg />} />
          <Route path="/areas/venango-pa" element={<VenangoCrawford />} />
          <Route path="/areas/townville-pa" element={<Townville />} />
          <Route path="/areas/conneautville-pa" element={<Conneautville />} />
          <Route path="/areas/hydetown-pa" element={<Hydetown />} />
          <Route path="/areas/riceville-pa" element={<Riceville />} />
          
          {/* City Pages - Erie County (additional) */}
          <Route path="/areas/albion-pa" element={<Albion />} />
          <Route path="/areas/mckean-pa" element={<McKean />} />
          <Route path="/areas/millcreek-pa" element={<Millcreek />} />
          <Route path="/areas/harborcreek-pa" element={<Harborcreek />} />
          <Route path="/areas/fairview-pa" element={<Fairview />} />
          <Route path="/areas/wesleyville-pa" element={<Wesleyville />} />
          <Route path="/areas/lawrence-park-pa" element={<LawrencePark />} />
          <Route path="/areas/union-city-pa" element={<UnionCity />} />
          <Route path="/areas/lake-city-pa" element={<LakeCity />} />
          <Route path="/areas/wattsburg-pa" element={<Wattsburg />} />
          
          {/* City Pages - Warren County */}
          <Route path="/areas/warren-pa" element={<Warren />} />
          <Route path="/areas/youngsville-pa" element={<Youngsville />} />
          <Route path="/areas/sheffield-pa" element={<Sheffield />} />
          <Route path="/areas/sugar-grove-pa" element={<SugarGrove />} />
          <Route path="/areas/tidioute-pa" element={<Tidioute />} />
          <Route path="/areas/clarendon-pa" element={<Clarendon />} />
          <Route path="/areas/bear-lake-pa" element={<BearLake />} />
          <Route path="/areas/russell-pa" element={<Russell />} />
          <Route path="/areas/north-warren-pa" element={<NorthWarren />} />
          <Route path="/areas/kinzua-pa" element={<Kinzua />} />
          <Route path="/areas/irvine-pa" element={<Irvine />} />
          <Route path="/areas/pittsfield-pa" element={<Pittsfield />} />
          <Route path="/areas/chandlers-valley-pa" element={<ChandlersValley />} />
          <Route path="/areas/spring-creek-pa" element={<SpringCreek />} />
          
          {/* City Pages - Mercer County (additional) */}
          <Route path="/areas/stoneboro-pa" element={<Stoneboro />} />
          <Route path="/areas/sandy-lake-pa" element={<SandyLake />} />
          <Route path="/areas/clark-pa" element={<Clark />} />
          
          {/* City Pages - Venango County (additional) */}
          <Route path="/areas/cranberry-township-pa" element={<CranberryTownship />} />
          <Route path="/areas/polk-pa" element={<Polk />} />
          <Route path="/areas/rouseville-pa" element={<Rouseville />} />
          <Route path="/areas/cooperstown-pa" element={<Cooperstown />} />
          <Route path="/areas/utica-pa" element={<Utica />} />
          <Route path="/areas/pleasantville-pa" element={<Pleasantville />} />
          
          {/* Other Pages */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/track-booking" element={<TrackBooking />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-canceled" element={<PaymentCanceled />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/legal/agreements" element={<Agreements />} />
          
          {/* Admin Pages */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/callscaler" element={<AdminCallScaler />} />
          <Route path="/admin/voice-agent" element={<AdminVoiceAgent />} />
          <Route path="/admin/whatsapp" element={<AdminWhatsAppConfig />} />
          <Route path="/admin/automation" element={<AdminAutomationFlows />} />
          
          {/* Utility Pages */}
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/logo-processor" element={<LogoProcessor />} />
          <Route path="/process-badges" element={<AllBadgesProcessor />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
