import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBrief: () => void;
  onOpenAdmin: () => void;
}

export default function Navbar({ onOpenBrief, onOpenAdmin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('expertise');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer on scroll
  useEffect(() => {
    const sections = ['expertise', 'works', 'pricing', 'team', 'contact'];
    const handleScrollSection = () => {
      const scrollPos = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSection, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSection);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            id="nav-logo-link"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg font-bold tracking-tighter font-krona hover:text-[#00ffff] transition-colors duration-300"
          >
            SARVI AI
          </a>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            <button
              id="nav-expertise-link"
              onClick={() => scrollToSection('expertise')}
              className={`text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 cursor-pointer ${
                activeSection === 'expertise'
                  ? 'text-[#00ffff] font-semibold drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              About Us
            </button>
            <button
              id="nav-works-link"
              onClick={() => scrollToSection('works')}
              className={`text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 cursor-pointer ${
                activeSection === 'works'
                  ? 'text-[#00ffff] font-semibold drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Features
            </button>
            <button
              id="nav-pricing-link"
              onClick={() => scrollToSection('pricing')}
              className={`text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 cursor-pointer ${
                activeSection === 'pricing'
                  ? 'text-[#00ffff] font-semibold drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pricing
            </button>
            <button
              id="nav-team-link"
              onClick={() => scrollToSection('team')}
              className={`text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 cursor-pointer ${
                activeSection === 'team'
                  ? 'text-[#00ffff] font-semibold drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Team
            </button>
          </div>

          {/* Start Talking CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="nav-admin-link"
              onClick={(e) => {
                e.preventDefault();
                onOpenAdmin();
              }}
              className="inline-flex items-center justify-center px-4 py-3 rounded-full text-xs uppercase tracking-widest font-medium bg-white/10 text-white border border-white/10 hover:bg-[#00ffff]/15 hover:text-[#00ffff] transition-all duration-300 cursor-pointer"
            >
              Admin Login
            </button>
            <button
              id="nav-cta-link"
              onClick={(e) => {
                e.preventDefault();
                onOpenBrief();
              }}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-xs uppercase tracking-widest font-medium bg-white text-black hover:scale-105 hover:bg-[#00ffff] hover:text-black transition-all duration-300 shadow-lg cursor-pointer"
            >
              Start Talking
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-[#00ffff] transition-colors focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <div
        id="mobile-nav-drawer"
        className={`fixed inset-0 bg-[#050505]/98 z-30 flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-8 text-center">
          <button
            onClick={() => scrollToSection('expertise')}
            className={`text-xl uppercase tracking-widest transition-colors duration-300 ${
              activeSection === 'expertise' ? 'text-[#00ffff] font-semibold' : 'text-gray-300 hover:text-[#00ffff]'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('works')}
            className={`text-xl uppercase tracking-widest transition-colors duration-300 ${
              activeSection === 'works' ? 'text-[#00ffff] font-semibold' : 'text-gray-300 hover:text-[#00ffff]'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className={`text-xl uppercase tracking-widest transition-colors duration-300 ${
              activeSection === 'pricing' ? 'text-[#00ffff] font-semibold' : 'text-gray-300 hover:text-[#00ffff]'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('team')}
            className={`text-xl uppercase tracking-widest transition-colors duration-300 ${
              activeSection === 'team' ? 'text-[#00ffff] font-semibold' : 'text-gray-300 hover:text-[#00ffff]'
            }`}
          >
            Team
          </button>
          <div className="pt-8 grid gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium bg-[#00ffff] text-black hover:bg-[#8effff] transition-all duration-300"
            >
              Admin Login
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBrief();
              }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium bg-white text-black hover:bg-[#00ffff] hover:text-black transition-all duration-300"
            >
              Start Talking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

