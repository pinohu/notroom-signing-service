import Link from "next/link"

export function PublicFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-white">Notroom</span>
            </div>
            <p className="text-sm">
              National signing service operations. 50-state coverage with unmatched reliability.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">For Title Companies</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Service Tiers</Link></li>
              <li><Link href="/coverage" className="hover:text-white transition-colors">Coverage Map</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Start Pilot</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">For Notaries</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/for-notaries" className="hover:text-white transition-colors">Why Join</Link></li>
              <li><Link href="/apply" className="hover:text-white transition-colors">Apply Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© {currentYear} Notroom LLC. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="tel:814-480-0989" className="hover:text-white transition-colors">
              📞 (814) 480-0989
            </a>
            <a href="mailto:closings@notroom.com" className="hover:text-white transition-colors">
              ✉️ closings@notroom.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

