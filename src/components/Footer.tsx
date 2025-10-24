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
    <footer className="bg-[hsl(var(--neutral-dark))] text-primary-foreground">
      {/* Footer Top */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img src={notroomLogo} alt="Notroom" className="h-10 mb-3 brightness-0 invert" />
            <p className="text-primary-foreground/70 mb-4 text-sm">
              Erie's Most Trusted Notary Service
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/notroom" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Facebook
              </a>
              <a href="https://linkedin.com/company/notroom" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateToPage("/services/remote-online-notary")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Remote Online Notary
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/services/mobile-notary")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Mobile Notary Erie PA
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/services/loan-signing-agent")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Loan Signing Agent
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/services/apostille")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Apostille Services
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/services/i9-verification")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  I-9 Verification
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/services/registered-office")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
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
                <button onClick={() => navigateToPage("/areas/erie-county")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Erie County
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/areas/crawford-county")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Crawford County
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/areas/warren-county")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Warren County
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/areas/mercer-county")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Mercer County
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/areas/venango-county")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Venango County
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/areas/statewide-online")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
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
                <button onClick={() => navigateToPage("/resources/how-ron-works")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  How RON Works
                </button>
              </li>
              <li>
                <button onClick={() => { navigate("/"); setTimeout(() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/pricing")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/subscriptions")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Subscription Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage("/track-booking")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
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
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  (814) 480-0989
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@notroom.com" 
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  support@notroom.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-primary-foreground/70 text-sm">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  Serving Erie, PA & Surrounding Areas
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Compliance Section - CRITICAL WARNING */}
      <div className="border-t border-border/10 bg-destructive/10">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-destructive/20 border-2 border-destructive rounded-lg p-6 max-w-6xl mx-auto">
            <p className="text-destructive font-bold text-base mb-3 text-center">
              🚨 CRITICAL COMPLIANCE WARNING - SITE NOT READY FOR LIVE OPERATION 🚨
            </p>
            <p className="text-destructive text-sm mb-3 font-semibold">
              REQUIRED BEFORE ACCEPTING ANY CLIENTS:
            </p>
            <div className="text-destructive text-xs space-y-2 bg-background/50 p-4 rounded">
              <p>✓ Pennsylvania Notary Public Commission #<span className="bg-yellow-300 text-black px-2 py-1 rounded font-bold">[ADD YOUR ACTUAL 6-DIGIT NUMBER]</span> | Expires: <span className="bg-yellow-300 text-black px-2 py-1 rounded font-bold">[MM/DD/YYYY]</span> | Commissioned in <span className="bg-yellow-300 text-black px-2 py-1 rounded font-bold">[COUNTY NAME]</span> County</p>
              <p>✓ Surety Bond: $10,000 | Bond #<span className="bg-yellow-300 text-black px-2 py-1 rounded font-bold">[ADD BOND NUMBER]</span> | Carrier: <span className="bg-yellow-300 text-black px-2 py-1 rounded font-bold">[ADD CARRIER NAME]</span></p>
              <p>✓ E&O Insurance: <span className="bg-yellow-300 text-black px-2 py-1 rounded font-bold">[VERIFY & ADD ACTUAL COVERAGE AMOUNT]</span> | Policy #<span className="bg-yellow-300 text-black px-2 py-1 rounded font-bold">[ADD POLICY NUMBER]</span></p>
              <p>✓ RON Authorization: <span className="bg-yellow-300 text-black px-2 py-1 rounded font-bold">[VERIFY PA DOS AUTHORIZATION STATUS]</span> | Platform: <span className="bg-yellow-300 text-black px-2 py-1 rounded font-bold">[SPECIFY PA-APPROVED PLATFORM - e.g., Notarize, Proof, OneNotary]</span></p>
              <p>✓ CROP Registration: <span className="bg-yellow-300 text-black px-2 py-1 rounded font-bold">[ADD PA DOS CROP REGISTRATION NUMBER OR REMOVE CROP SERVICES FROM WEBSITE]</span></p>
            </div>
            <p className="text-destructive text-xs mt-3 text-center font-bold">
              ⚠️ Operating without proper credentials violates Pennsylvania law (57 Pa.C.S. § 321) and may result in commission suspension, civil penalties up to $1,000 per violation, and potential criminal charges. ⚠️
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-border/10" id="footer-content">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright & Trademark */}
            <div className="text-primary-foreground/60 text-sm text-center md:text-left">
              <div>© {currentYear} Notroom LLC. All rights reserved.</div>
              <div className="text-xs mt-1">
                "Notroom" is a trademark of Notroom LLC. Unauthorized use prohibited.
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6" role="navigation" aria-label="Legal information">
              <button 
                onClick={() => navigateToPage("/privacy-policy")} 
                className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label="View privacy policy"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => navigateToPage("/terms-of-service")} 
                className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label="View terms of service"
              >
                Terms of Service
              </button>
            </div>

            {/* Badges */}
            <div className="flex gap-3 flex-wrap justify-center" role="list" aria-label="Compliance certifications">
              <div className="px-3 py-1 bg-background/10 rounded-full text-xs font-semibold" role="listitem">
                PA State Licensed
              </div>
              <div className="px-3 py-1 bg-background/10 rounded-full text-xs font-semibold" role="listitem">
                Background Checked
              </div>
              <div className="px-3 py-1 bg-background/10 rounded-full text-xs font-semibold" role="listitem">
                RULONA Compliant
              </div>
            </div>
          </div>

          {/* E-Sign Act & AML Disclaimer */}
          <div className="mt-6 pt-6 border-t border-border/10 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 text-xs text-primary-foreground/50">
              <div>
                <strong className="text-primary-foreground/70">E-Sign Act Compliance:</strong> Electronic signatures 
                and records provided through our RON services comply with the Electronic Signatures in Global and 
                National Commerce Act (15 U.S.C. § 7001) and Pennsylvania RULONA (57 Pa.C.S. § 301 et seq.). 
                Electronic signatures have the same legal effect as handwritten signatures.
              </div>
              <div>
                <strong className="text-primary-foreground/70">AML & Financial Crimes Prevention:</strong> We maintain 
                procedures to detect and prevent money laundering in compliance with FinCEN guidelines. We reserve 
                the right to refuse service, request additional identification, and report suspicious activity to 
                appropriate authorities without prior notice.
              </div>
            </div>
          </div>

          {/* CCPA Link */}
          <div className="mt-4 text-center">
            <button 
              onClick={() => navigateToPage("/privacy-policy#ccpa")} 
              className="text-xs text-primary-foreground/60 hover:text-primary-foreground underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              aria-label="California privacy rights - Do not sell my personal information"
            >
              Do Not Sell or Share My Personal Information (CCPA)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
