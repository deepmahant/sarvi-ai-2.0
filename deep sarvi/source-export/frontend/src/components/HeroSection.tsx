import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroSectionProps {
  onEnterVoid: () => void;
}

export default function HeroSection({ onEnterVoid }: HeroSectionProps) {
  const [time, setTime] = useState('11:11 PM');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll parallax effect using motion
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    // 1. Clock Update
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 10000);

    // 2. Mouse Move Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30; // Max 30px shift
      const y = (clientY / window.innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20"
    >
      {/* Background Atmosphere */}
      <div id="hero-atmosphere-ambient" className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Sleek Interface theme gradients */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at 50% -20%, #003366 0%, transparent 60%), radial-gradient(circle at 20% 80%, #001122 0%, transparent 40%)'
          }}
        />
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Sleek Interface SVG shape 1 (Top Left) */}
      <motion.div
        id="hero-sleek-blob-left"
        className="absolute top-[-100px] left-[-50px] w-[600px] h-[600px] z-10 opacity-40 rotate-[15deg] pointer-events-none select-none"
        animate={{
          x: mousePosition.x * -0.3,
          y: mousePosition.y * -0.3 + (Math.sin(Date.now() / 2000) * 10),
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00ffff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0033ff', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path fill="url(#grad1)" d="M45,-70.2C58.1,-63.4,68.4,-50.7,75.4,-36.5C82.4,-22.3,86.2,-6.6,83.9,8.4C81.6,23.3,73.1,37.6,62.1,49.2C51,60.8,37.3,69.7,22.6,74.5C7.9,79.4,-7.8,80.1,-22.1,75.3C-36.4,70.5,-49.2,60.1,-60.2,47.8C-71.1,35.4,-80.1,21.2,-82.1,5.9C-84.1,-9.3,-79.1,-25.6,-69.5,-38.7C-59.8,-51.7,-45.5,-61.5,-31.2,-67.7C-16.9,-73.9,-2.6,-76.5,12.2,-75.6C26.9,-74.6,41.9,-70.1,45,-70.2Z" transform="translate(100 100)" />
          <path d="M80,100 Q100,60 140,80 T180,60" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Sleek Interface SVG shape 2 (Bottom Right) */}
      <motion.div
        id="hero-sleek-blob-right"
        className="absolute bottom-[-80px] right-[-50px] w-[550px] h-[550px] z-10 opacity-40 rotate-[-20deg] pointer-events-none select-none"
        animate={{
          x: mousePosition.x * 0.3,
          y: mousePosition.y * 0.3 + (Math.sin(Date.now() / 2300) * -10),
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="grad2" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#0055ff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#33ffff', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path fill="url(#grad2)" d="M38.8,-62.7C49.9,-54.6,58.3,-43.3,64.8,-31C71.3,-18.7,75.9,-5.4,73.6,6.9C71.3,19.2,62.1,30.5,51.8,40.1C41.5,49.7,30.1,57.6,17.4,61.9C4.6,66.1,-9.5,66.6,-22.7,62.8C-35.9,59.1,-48.2,51.1,-57.4,40.3C-66.6,29.5,-72.7,15.9,-74.4,1.4C-76.1,-13.2,-73.5,-28.7,-65.4,-41.2C-57.2,-53.7,-43.5,-63.2,-30,-69.1C-16.5,-75,-3.2,-77.3,10.1,-75.4C23.5,-73.5,38.8,-62.7,38.8,-62.7Z" transform="translate(100 100)" />
        </svg>
      </motion.div>

      {/* Floating Left Hand Reaching (Sepia with Blue Hue-Rotate filter) */}
      <motion.div
        id="hero-floating-hand-left"
        className="absolute -left-[10%] top-[-10%] md:left-[-3%] md:top-[-10%] w-[55vw] md:w-[42vw] max-w-[850px] z-10 pointer-events-none mix-blend-screen opacity-[0.35] select-none"
        animate={{
          x: mousePosition.x * -0.5,
          y: mousePosition.y * -0.5 + (Math.sin(Date.now() / 2000) * 12),
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 15, mass: 0.5 }}
      >
        <img
          src="https://framerusercontent.com/images/KNhiA5A2ykNYqNkj04Hk6BVg5A.png?width=1540&amp;height=1320"
          alt="Surreal Left Hand Reaching"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain filter sepia(1) hue-rotate-[190deg] saturate-[18] brightness-[0.75] contrast-[1.25] animate-float-left"
        />
      </motion.div>

      {/* Floating Right Hand Receiving */}
      <motion.div
        id="hero-floating-hand-right"
        className="absolute -right-[10%] bottom-[-5%] md:right-[-3%] md:bottom-[0%] w-[50vw] md:w-[38vw] max-w-[750px] z-10 pointer-events-none mix-blend-screen opacity-[0.35] select-none"
        animate={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5 + (Math.sin(Date.now() / 2300) * -12),
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 15, mass: 0.5 }}
      >
        <img
          src="https://framerusercontent.com/images/X89VFCABCEjjZ4oLGa3PjbOmsA.png?width=1542&amp;height=1002"
          alt="Surreal Right Hand Receiving"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain filter sepia(1) hue-rotate-[190deg] saturate-[18] brightness-[0.75] contrast-[1.25] animate-float-right"
        />
      </motion.div>

      {/* Hero Content Wrapper */}
      <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center justify-center h-full">
        <motion.div
          id="hero-content-wrapper"
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Main Title Heading */}
          <motion.div
            id="hero-headline-wrapper"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-[64px] font-normal leading-[1.2] tracking-tighter mb-8 text-white mix-blend-difference font-krona text-glow">
              <motion.span
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                We're
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block ml-2"
              >
                always
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block opacity-80"
              >
                here
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block ml-2 opacity-80"
              >
                for
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block ml-2 opacity-80"
              >
                you
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle Slogan */}
          <motion.div
            id="hero-subtext-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          >
            <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto mb-16 font-light leading-relaxed">
              We turn the weight you carry quietly into something you can finally say out loud. No waiting room, no judgment just a place that listens..
            </p>
          </motion.div>

          {/* Call to Action Button */}
          <motion.div
            id="hero-actions-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-10"
          >
            <button
              id="enter-void-button"
              onClick={onEnterVoid}
              className="group relative cursor-pointer focus:outline-none"
            >
              <div className="absolute inset-0 bg-[#00ffff]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative border border-white/10 bg-white/5 backdrop-blur-xl px-12 py-5 rounded-full flex items-center gap-6 group cursor-pointer hover:border-white/40 transition-all">
                <span className="text-xs uppercase tracking-[0.4em] text-white">Enter the Space</span>
                <div className="w-5 h-5 flex items-center justify-center border border-white/30 rounded-full text-[10px] text-[#00ffff] group-hover:translate-x-1 transition-transform">→</div>
              </div>
            </button>

            {/* Time coordinates indicators */}
            <div
              id="hero-timezone-panel"
              className="flex items-center gap-6 text-[10px] md:text-xs text-white/35 uppercase tracking-[0.4em] mt-12 font-mono"
            >
              <span id="current-time">{time}</span>
              <span className="w-px h-4 bg-white/10"></span>
              <span id="nyc-location-label">WB, IND</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
