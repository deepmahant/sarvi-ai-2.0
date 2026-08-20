import React from 'react';

interface FooterProps {
  onOpenTerms?: () => void;
}

export default function Footer({ onOpenTerms }: FooterProps) {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenTerms) {
      onOpenTerms();
    }
  };

  return (
    <footer id="main-footer" className="py-20 border-t border-white/5 bg-[#050505] relative z-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Logo Brand info */}
          <div id="footer-logo-panel" className="flex flex-col gap-2 text-center md:text-left">
            <a
              id="footer-logo-link"
              href="#"
              onClick={scrollToTop}
              className="text-lg font-bold tracking-tighter font-krona text-white hover:text-[#00ffff] transition-colors duration-300"
            >
              SARVI AI.
            </a>
            <p id="footer-copyright" className="text-[10px] uppercase tracking-[0.5em] text-gray-600">
              ANUVA NEXUXS © 2026
            </p>
          </div>
          
          {/* Action Links & System Status */}
          <div id="footer-meta-panel" className="flex flex-col md:flex-row items-center gap-12">
            <div id="footer-links" className="flex gap-8 text-[10px] uppercase tracking-widest text-gray-500">
              <a href="#" id="foot-privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a
                href="/terms"
                id="foot-terms"
                onClick={handleTermsClick}
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </a>
              <a href="#" id="foot-credits" className="hover:text-white transition-colors">
                Credits
              </a>
            </div>
            
            {/* Real-time system status indicators */}
            <div id="footer-status" className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              
            </div>
          </div>
        </div>

        {/* DPDP Act Compliance Badge */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2">
            <svg className="w-4 h-4 text-[#00ffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400">
              DPDP Act 2023 Compliant — Government of India
            </span>
          </div>
          <p className="text-[9px] text-gray-600 text-center max-w-md">
            SARVI AI operates in compliance with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.
          </p>
        </div>
      </div>
    </footer>
  );
}

