import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--neutral-dark))] text-white">
      {/* Footer Top */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold mb-3">NOTROOM</div>
            <p className="text-white/70 mb-4 text-sm">
              Erie's Most Trusted Notary Service
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="/services/remote-online-notary" className="text-white/70 hover:text-white transition-colors text-sm">
                  Remote Online Notary
                </a>
              </li>
              <li>
                <a href="/services/mobile-notary" className="text-white/70 hover:text-white transition-colors text-sm">
                  Mobile Notary Erie PA
                </a>
              </li>
              <li>
                <a href="/services/loan-signing-agent" className="text-white/70 hover:text-white transition-colors text-sm">
                  Loan Signing Agent
                </a>
              </li>
              <li>
                <a href="/services/business-retainer" className="text-white/70 hover:text-white transition-colors text-sm">
                  Business Retainer Plans
                </a>
              </li>
              <li>
                <a href="/services/apostille" className="text-white/70 hover:text-white transition-colors text-sm">
                  Apostille Services
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas Column */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Service Areas</h4>
            <ul className="space-y-2">
              <li>
                <a href="/areas/erie-county" className="text-white/70 hover:text-white transition-colors text-sm">
                  Erie County
                </a>
              </li>
              <li>
                <a href="/areas/crawford-county" className="text-white/70 hover:text-white transition-colors text-sm">
                  Crawford County
                </a>
              </li>
              <li>
                <a href="/areas/warren-county" className="text-white/70 hover:text-white transition-colors text-sm">
                  Warren County
                </a>
              </li>
              <li>
                <a href="/areas/statewide-online" className="text-white/70 hover:text-white transition-colors text-sm">
                  Statewide Online
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="/resources/how-ron-works" className="text-white/70 hover:text-white transition-colors text-sm">
                  How RON Works
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-white/70 hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-white/70 hover:text-white transition-colors text-sm">
                  Pricing
                </a>
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
              Licensed & Bonded Pennsylvania Notary Public | Commission #[COMMISSION_NUMBER] | Compliant with 57 Pa.C.S. Chapter 3 (RULONA)
            </p>
            <p className="text-white/60 text-xs">
              Pennsylvania-commissioned notary with required 3-hour state-approved education | Remote Online Notarization authorized under Act 79 of 2020
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
              <a href="/privacy-policy" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
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
