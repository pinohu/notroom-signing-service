import { Mail, Phone, MapPin } from "lucide-react";
import notroomLogo from "@/assets/notroom-logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const navigateToPage = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[hsl(var(--neutral-dark))] text-white">
      {/* Footer Top */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img src={notroomLogo} alt="Notroom" className="h-10 mb-3 brightness-0 invert" />
            <p className="text-white/70 mb-4 text-sm">
              Erie's Most Trusted Notary Service
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/notroom" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="https://linkedin.com/company/notroom" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateToPage("/services/remote-online-notary")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Remote Online Notary
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/services/mobile-notary")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Mobile Notary Erie PA
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/services/loan-signing-agent")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Loan Signing Agent
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/services/apostille")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Apostille Services
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/services/i9-verification")} className="text-white/70 hover:text-white transition-colors text-sm">
                  I-9 Verification
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/services/registered-office")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Registered Office & Business Filings
                </button>
              </li>
            </ul>
          </div>

          {/* Service Areas Column */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Service Areas</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateToPage("/areas/erie-county")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Erie County
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/areas/crawford-county")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Crawford County
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/areas/warren-county")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Warren County
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/areas/mercer-county")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Mercer County
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/areas/venango-county")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Venango County
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/areas/statewide-online")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Statewide Online
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Resources</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateToPage("/resources/how-ron-works")} className="text-white/70 hover:text-white transition-colors text-sm">
                  How RON Works
                </button>
              </li>
              <li>
                <button onClick={() => { navigate("/"); setTimeout(() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="text-white/70 hover:text-white transition-colors text-sm">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/pricing")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/subscriptions")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Subscription Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/track-booking")} className="text-white/70 hover:text-white transition-colors text-sm">
                  Track Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:814-480-0989" 
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  (814) 480-0989
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@notroom.com" 
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  support@notroom.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  Serving Erie, PA & Surrounding Areas
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Compliance Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <p className="text-white/60 text-xs mb-2">
              <span className="text-amber-400">⚠️ COMPLIANCE NOTICE:</span> Pennsylvania Notary Public Commission #[YOUR COMMISSION NUMBER REQUIRED] | Expires: [DATE] | Bonded ($10,000) & Insured | Compliant with 57 Pa.C.S. Chapter 3 (RULONA)
            </p>
            <p className="text-white/60 text-xs">
              Remote Online Notarization authorized under Act 97 of 2020 | Registered with PA Department of State | RON Platform: [SPECIFY APPROVED PLATFORM] | Commercial Registered Office Provider registered with PA Department of State Bureau of Corporations
            </p>
            <p className="text-white/60 text-xs mt-2">
              <em>All services require completion of proper licensing and registrations before launch. See COMPLIANCE_CHECKLIST.md for details.</em>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-white/60 text-sm">
              © {currentYear} Notroom LLC. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
              <button onClick={() => navigateToPage("/privacy-policy")} className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => navigateToPage("/terms-of-service")} className="text-white/60 hover:text-white text-sm transition-colors">
                Terms of Service
              </button>
            </div>

            {/* Badges */}
            <div className="flex gap-3 flex-wrap justify-center">
              <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">
                PA State Commissioned
              </div>
              <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">
                NNA Certified
              </div>
              <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">
                RULONA Compliant
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
