import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';

interface LandingPageProps {
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
}

export default function LandingPage({ onOpenAuth, onOpenAdmin }: LandingPageProps) {
  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-[#00ffff] selection:text-black">
      <Navbar onOpenBrief={onOpenAuth} onOpenAdmin={onOpenAdmin} />
      <HeroSection onEnterVoid={onOpenAuth} />
      <AboutSection />
      <FeaturesSection />
      <div className="py-24 border-t border-white/10 bg-[#07090F]">
        <div className="container mx-auto px-6 text-center">
          <span className="text-[10px] uppercase tracking-[0.45em] text-[#00ffff] font-mono mb-4 inline-block">Admin Login</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Admin Panel Access</h2>
          <p className="max-w-3xl mx-auto text-sm text-gray-400 leading-relaxed mb-8">
            Admins can sign in through the same secure login page. Use your admin credentials to access the separate admin control panel instantly.
          </p>
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center justify-center rounded-full bg-[#00ffff] px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-[#8effff] shadow-[0_15px_30px_rgba(0,255,255,0.25)]"
          >
            Admin Login
          </button>
        </div>
      </div>
      <PricingSection onSelectPlan={onOpenAuth} />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
