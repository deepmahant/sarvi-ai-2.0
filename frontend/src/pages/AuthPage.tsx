import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { SmokeyBackground, LoginForm } from '../components/ui/login-form';

interface AuthPageProps {
  onSuccess: (user: { name: string; email: string }) => void;
  onBackToHome: () => void;
}

export default function AuthPage({ onSuccess, onBackToHome }: AuthPageProps) {
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname === '/admin';

  return (
    <div
      id="auth-container-viewport"
      className="min-h-screen bg-[#04050A] text-white flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans"
    >
      {/* Interactive WebGL Smokey Shader Background */}
      <SmokeyBackground 
        backdropBlurAmount="md" 
        color="#00ffff" 
        className="absolute inset-0 z-0" 
      />

      {/* Back to Home Button */}
      <button
        id="auth-back-to-home"
        onClick={onBackToHome}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 bg-black/60 text-[10px] text-gray-300 hover:text-[#00ffff] hover:border-[#00ffff]/50 hover:bg-black/80 transition-all duration-300 backdrop-blur-md cursor-pointer uppercase tracking-widest shadow-lg"
      >
        <ArrowLeft size={14} />
        <span>Back to Home</span>
      </button>

      {/* Centered Sarvi AI Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center mb-6 text-center select-none"
      >
        <span className="font-krona text-xl md:text-2xl tracking-[0.25em] text-white uppercase bg-gradient-to-r from-white via-[#e0ffff] to-[#00ffff] bg-clip-text text-transparent mb-1">
          SARVI AI
        </span>
        <span className="text-[9px] uppercase tracking-[0.4em] text-[#00ffff] font-medium opacity-90">
          SAFE SPACE
        </span>
      </motion.div>

      {/* Centered Glassmorphism Login Form */}
      <motion.div
        id="auth-glass-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex justify-center"
      >
        <LoginForm onSuccess={onSuccess} />
      </motion.div>
    </div>
  );
}

