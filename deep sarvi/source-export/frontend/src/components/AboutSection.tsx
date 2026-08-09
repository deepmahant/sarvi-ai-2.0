import { motion } from 'motion/react';
import { ClientLogo } from '../types/appTypes';

const LOGOS: ClientLogo[] = [
  { name: 'PRIVATE', delayMs: 0 },
  { name: '24/7', delayMs: 150 },
  { name: 'GENTLE', delayMs: 300 },
  { name: 'GROUNDED', delayMs: 450 },
];

export default function AboutSection() {
  return (
    <section id="expertise" className="py-48 relative border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Section Marker */}
          <motion.span
            id="philosophy-badge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.5em] text-[#00ffff] mb-8 block font-mono"
          >
            ABOUT US
          </motion.span>

          {/* Primary Statement */}
          <motion.h2
            id="philosophy-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-white/90 mb-16 font-serif tracking-tight max-w-4xl"
          >
           Where Understanding Begins
          </motion.h2>

          {/* Explanation Text */}
          <motion.p
            id="philosophy-description"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl mx-auto"
          >
           Sarvi AI is your AI-powered mental wellness companion, offering private, judgment-free conversations, emotional support, and personalized guidance whenever you need it.
          </motion.p>
        </div>

        {/* Animated Client Logo Grid */}
        <div id="client-logos-wrapper" className="mt-40 max-w-5xl mx-auto">
          <p id="logos-caption" className="text-[10px] uppercase tracking-[0.3em] text-gray-600 text-center mb-10 font-mono">
            DESIGNED WITH PRIVACY, EMPATHY & AI AT ITS CORE
          </p>
          
          <div
            id="logos-grid"
            className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 items-center justify-items-center"
          >
            {LOGOS.map((logo) => (
              <motion.div
                key={logo.name}
                id={`logo-item-${logo.name.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.35, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ opacity: 0.9, scale: 1.05, color: '#00ffff' }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 15,
                  opacity: { duration: 0.6, delay: logo.delayMs / 1000 },
                }}
                className="font-krona text-xs md:text-sm tracking-[0.15em] uppercase select-none cursor-pointer text-white text-center transition-colors duration-500"
              >
                {logo.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
