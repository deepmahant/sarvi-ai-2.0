import React from 'react';

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              <a href="#" id="foot-terms" className="hover:text-white transition-colors">
                Terms
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
      </div>
    </footer>
  );
}
