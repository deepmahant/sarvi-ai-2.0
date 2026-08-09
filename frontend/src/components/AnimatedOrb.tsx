import React, { useState, useEffect } from 'react';
import { OrbState } from '../types/chatTypes';

export type { OrbState };

interface AnimatedOrbProps {
  state: OrbState;
  className?: string;
  isMobileBackground?: boolean;
}

const ALL_STATES = [
  'calm-blue',
  'calm-cyan',
  'calm-purple',
  'calm-pink',
  'calm-green',
  'happy',
  'excited',
  'sad',
  'encouraging',
  'hopeful',
  'thinking',
  'listening'
] as const;

type InternalState = typeof ALL_STATES[number];

const STATE_STYLING: Record<InternalState, {
  gradient: string;
  glow: string;
  particleColor: string;
}> = {
  'calm-blue': {
    gradient: 'radial-gradient(circle at 35% 35%, #1e40af 0%, #1d4ed8 45%, #0f172a 100%)',
    glow: 'rgba(37, 99, 235, 0.45)',
    particleColor: 'rgba(96, 165, 250, 0.65)'
  },
  'calm-cyan': {
    gradient: 'radial-gradient(circle at 35% 35%, #0891b2 0%, #06b6d4 45%, #083344 100%)',
    glow: 'rgba(6, 182, 212, 0.45)',
    particleColor: 'rgba(34, 211, 238, 0.65)'
  },
  'calm-purple': {
    gradient: 'radial-gradient(circle at 35% 35%, #7c3aed 0%, #a855f7 45%, #1e1b4b 100%)',
    glow: 'rgba(168, 85, 247, 0.45)',
    particleColor: 'rgba(192, 132, 252, 0.65)'
  },
  'calm-pink': {
    gradient: 'radial-gradient(circle at 35% 35%, #db2777 0%, #f43f5e 45%, #4c0519 100%)',
    glow: 'rgba(244, 63, 94, 0.45)',
    particleColor: 'rgba(251, 113, 133, 0.65)'
  },
  'calm-green': {
    gradient: 'radial-gradient(circle at 35% 35%, #059669 0%, #10b981 45%, #022c22 100%)',
    glow: 'rgba(16, 185, 129, 0.45)',
    particleColor: 'rgba(52, 211, 153, 0.65)'
  },
  'happy': {
    gradient: 'radial-gradient(circle at 35% 35%, #06b6d4 0%, #10b981 50%, #022c22 100%)',
    glow: 'rgba(6, 182, 212, 0.55)',
    particleColor: 'rgba(110, 231, 183, 0.75)'
  },
  'excited': {
    gradient: 'radial-gradient(circle at 35% 35%, #f59e0b 0%, #ef4444 50%, #7c2d12 100%)',
    glow: 'rgba(245, 158, 11, 0.6)',
    particleColor: 'rgba(252, 211, 77, 0.75)'
  },
  'sad': {
    gradient: 'radial-gradient(circle at 35% 35%, #1d4ed8 0%, #1e1b4b 60%, #030712 100%)',
    glow: 'rgba(29, 78, 216, 0.25)',
    particleColor: 'rgba(96, 165, 250, 0.35)'
  },
  'encouraging': {
    gradient: 'radial-gradient(circle at 35% 35%, #db2777 0%, #7c3aed 50%, #1e1b4b 100%)',
    glow: 'rgba(219, 39, 119, 0.5)',
    particleColor: 'rgba(244, 114, 182, 0.7)'
  },
  'hopeful': {
    gradient: 'radial-gradient(circle at 35% 35%, #10b981 0%, #06b6d4 50%, #083344 100%)',
    glow: 'rgba(16, 185, 129, 0.5)',
    particleColor: 'rgba(110, 231, 183, 0.7)'
  },
  'thinking': {
    gradient: 'radial-gradient(circle at 35% 35%, #6366f1 0%, #4f46e5 50%, #0f172a 100%)',
    glow: 'rgba(99, 102, 241, 0.5)',
    particleColor: 'rgba(165, 180, 252, 0.65)'
  },
  'listening': {
    gradient: 'radial-gradient(circle at 35% 35%, #00ffff 0%, #0284c7 50%, #0a1329 100%)',
    glow: 'rgba(0, 255, 255, 0.55)',
    particleColor: 'rgba(191, 219, 254, 0.75)'
  }
};

const AnimatedOrb = React.memo(function AnimatedOrb({ state, className = '', isMobileBackground = false }: AnimatedOrbProps) {
  const [calmIndex, setCalmIndex] = useState(0);
  const calmCycle = ['calm-blue', 'calm-cyan', 'calm-purple', 'calm-pink', 'calm-green'] as const;

  // Slow smooth transition cycle when idle (calm state) - 7 seconds per cycle
  useEffect(() => {
    if (state === 'calm') {
      const interval = setInterval(() => {
        setCalmIndex((prev) => (prev + 1) % calmCycle.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [state]);

  const activeInternalState: InternalState = state === 'calm' ? calmCycle[calmIndex] : state;
  const currentStyling = STATE_STYLING[activeInternalState] || STATE_STYLING['calm-blue'];

  if (isMobileBackground) {
    return (
      <div 
        className={`relative select-none pointer-events-none flex items-center justify-center transform-gpu will-change-transform opacity-[0.24] ${className}`}
        style={{
          animation: 'orb-float 12s ease-in-out infinite',
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes orb-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(3deg); }
          }
        `}} />

        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: currentStyling.gradient,
            filter: 'blur(22px)',
            opacity: 0.22,
          }}
        />

        <div
          className="relative w-full h-full rounded-full border border-white/5"
          style={{
            background: currentStyling.gradient,
            boxShadow: `0 0 34px ${currentStyling.glow}`,
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative select-none pointer-events-none flex items-center justify-center transform-gpu will-change-transform ${className}`}
      style={{
        animation: 'orb-float 7s ease-in-out infinite',
      }}
    >
      {/* Dynamic Keyframes Injected Directly */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orb-inner-morph {
          0% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: rotate(0deg) scale(0.97) translate3d(0,0,0);
          }
          20% {
            border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%;
            transform: rotate(72deg) scale(1.03) translate3d(2px, -3px, 0);
          }
          40% {
            border-radius: 30% 70% 40% 60% / 50% 60% 40% 50%;
            transform: rotate(144deg) scale(0.96) translate3d(-3px, 1px, 0);
          }
          60% {
            border-radius: 58% 42% 65% 35% / 45% 55% 45% 55%;
            transform: rotate(216deg) scale(1.04) translate3d(1px, -4px, 0);
          }
          80% {
            border-radius: 40% 60% 45% 55% / 55% 45% 55% 45%;
            transform: rotate(288deg) scale(0.97) translate3d(-2px, 3px, 0);
          }
          100% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: rotate(360deg) scale(0.97) translate3d(0,0,0);
          }
        }

        @keyframes orb-outer-morph {
          0% {
            border-radius: 48% 52% 54% 46% / 52% 48% 52% 48%;
            transform: rotate(0deg) scale(1) translate3d(0,0,0);
          }
          25% {
            border-radius: 52% 48% 46% 54% / 48% 52% 48% 52%;
            transform: rotate(-90deg) scale(1.02) translate3d(1px, -2px, 0);
          }
          50% {
            border-radius: 54% 46% 52% 48% / 52% 46% 54% 48%;
            transform: rotate(-180deg) scale(0.98) translate3d(-2px, 1px, 0);
          }
          75% {
            border-radius: 46% 54% 48% 52% / 48% 54% 46% 54%;
            transform: rotate(-270deg) scale(1.02) translate3d(2px, -1px, 0);
          }
          100% {
            border-radius: 48% 52% 54% 46% / 52% 48% 52% 48%;
            transform: rotate(-360deg) scale(1) translate3d(0,0,0);
          }
        }

        @keyframes orb-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }

        @keyframes orb-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }

        @keyframes orb-glow-pulse-custom {
          0%, 100% { transform: scale(1) translateZ(0); opacity: 0.75; }
          50% { transform: scale(1.08) translateZ(0); opacity: 0.95; }
        }

        @keyframes float-sparkle-1 {
          0%, 100% { transform: translate(-20%, -20%) scale(0.8); opacity: 0.3; }
          50% { transform: translate(25%, 30%) scale(1.3); opacity: 0.85; }
        }

        @keyframes float-sparkle-2 {
          0%, 100% { transform: translate(30%, -15%) scale(1.2); opacity: 0.7; }
          50% { transform: translate(-30%, 25%) scale(0.7); opacity: 0.3; }
        }

        @keyframes float-sparkle-3 {
          0%, 100% { transform: translate(-25%, 25%) scale(0.7); opacity: 0.4; }
          50% { transform: translate(20%, -25%) scale(1.1); opacity: 0.9; }
        }

        @keyframes float-sparkle-4 {
          0%, 100% { transform: translate(15%, 15%) scale(1.0); opacity: 0.5; }
          50% { transform: translate(-15%, -15%) scale(0.6); opacity: 0.2; }
        }
      `}} />

      {/* 1. Large Diffused Ambient Glowing Aura (Crossfaded smoothly over 4.5s for seamless transitions) */}
      <div 
        className="absolute w-[140%] h-[140%] mix-blend-screen transform-gpu will-change-transform"
        style={{
          filter: 'blur(36px)',
          animation: 'orb-glow-pulse-custom 9s ease-in-out infinite',
        }}
      >
        {ALL_STATES.map((s) => {
          const isActive = s === activeInternalState;
          return (
            <div
              key={s}
              className="absolute inset-0 transition-opacity duration-[4500ms] cubic-bezier(0.25, 0.8, 0.25, 1)"
              style={{
                background: `radial-gradient(circle, ${STATE_STYLING[s].glow} 0%, transparent 70%)`,
                opacity: isActive ? 1 : 0,
              }}
            />
          );
        })}
      </div>

      {/* 2. Outer Glassmorphism Orb Shield */}
      <div 
        className="absolute w-full h-full backdrop-blur-[24px] bg-white/[0.03] border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06),inset_0_0_20px_rgba(255,255,255,0.02)] overflow-hidden flex items-center justify-center"
        style={{
          animation: 'orb-outer-morph 20s linear infinite, orb-breathe 8s ease-in-out infinite',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(80, 180, 255, 0.12)',
        }}
      >
        {/* 3. Centered Inner Fluidic Liquid Core (Crossfading smoothly over 5.5s) */}
        <div className="absolute w-[78%] h-[78%] overflow-hidden flex items-center justify-center" style={{ transform: 'translate3d(0,0,0)' }}>
          {ALL_STATES.map((s) => {
            const isActive = s === activeInternalState;
            return (
              <div
                key={s}
                className="absolute inset-0 transition-opacity duration-[5500ms] cubic-bezier(0.4, 0, 0.2, 1)"
                style={{
                  background: STATE_STYLING[s].gradient,
                  opacity: isActive ? 1 : 0,
                  animation: 'orb-inner-morph 14s linear infinite',
                  transformOrigin: 'center center',
                }}
              />
            );
          })}
        </div>

        {/* 4. Floating Inner Sparkles / Particles */}
        <div className="absolute inset-0 z-10 overflow-hidden mix-blend-screen pointer-events-none">
          <div 
            className="absolute w-2 h-2 rounded-full transition-colors duration-1000"
            style={{
              backgroundColor: currentStyling.particleColor,
              boxShadow: `0 0 10px ${currentStyling.particleColor}`,
              top: '32%',
              left: '38%',
              animation: 'float-sparkle-1 8s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute w-2.5 h-2.5 rounded-full transition-colors duration-1000"
            style={{
              backgroundColor: currentStyling.particleColor,
              boxShadow: `0 0 14px ${currentStyling.particleColor}`,
              top: '48%',
              left: '62%',
              animation: 'float-sparkle-2 10s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute w-1.5 h-1.5 rounded-full transition-colors duration-1000"
            style={{
              backgroundColor: currentStyling.particleColor,
              boxShadow: `0 0 8px ${currentStyling.particleColor}`,
              top: '58%',
              left: '28%',
              animation: 'float-sparkle-3 12s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute w-1.5 h-1.5 rounded-full transition-colors duration-1000"
            style={{
              backgroundColor: currentStyling.particleColor,
              boxShadow: `0 0 8px ${currentStyling.particleColor}`,
              top: '25%',
              left: '55%',
              animation: 'float-sparkle-4 9s ease-in-out infinite',
            }}
          />
        </div>

        {/* 5. Realistic Glass Rim Shadows & Light Distortions inside the Outer Shield */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none rounded-inherit"
          style={{
            boxShadow: 'inset -12px -12px 25px rgba(0,0,0,0.55), inset 12px 12px 20px rgba(255,255,255,0.22)',
            borderRadius: 'inherit',
          }}
        />

        <div 
          className="absolute inset-0 z-25 pointer-events-none rounded-inherit"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.35) 100%)',
            borderRadius: 'inherit',
          }}
        />
      </div>

      {/* 6. Front High-fidelity Glass Polish Cover & Outer Highlights */}
      <div 
        className="absolute w-full h-full border border-white/20 z-30 pointer-events-none"
        style={{
          animation: 'orb-outer-morph 20s linear infinite, orb-breathe 8s ease-in-out infinite',
        }}
      />

      {/* 7. Glass Highlight Reflection Crescent (Top Left) */}
      <div 
        className="absolute top-[8%] left-[12%] w-[76%] h-[26%] rounded-[50%] bg-gradient-to-b from-white/28 to-transparent select-none pointer-events-none transform -rotate-[15deg] z-35"
        style={{
          filter: 'blur(0.5px)',
        }}
      />

      {/* 8. Secondary Rim Highlight (Bottom Right) */}
      <div 
        className="absolute bottom-[6%] right-[10%] w-[38%] h-[16%] rounded-[50%] bg-gradient-to-t from-white/12 to-transparent select-none pointer-events-none transform rotate-[45deg] z-35"
        style={{
          filter: 'blur(1.2px)',
        }}
      />
    </div>
  );
});

export default AnimatedOrb;
