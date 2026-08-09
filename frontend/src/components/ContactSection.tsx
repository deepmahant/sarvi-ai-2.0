import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Link as LinkIcon 
} from 'lucide-react';

export default function ContactSection() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardsContainer = cardsContainerRef.current;
    if (!cardsContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = cardsContainer.querySelectorAll<HTMLDivElement>('.card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    cardsContainer.addEventListener('mousemove', handleMouseMove);
    return () => {
      cardsContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const cardsData = [
    {
      id: 'card-instagram',
      title: 'Instagram',
      href: 'https://www.instagram.com/the_anuva_nexus/',
      linkId: 'social-ig',
      actionText: 'Follow Us',
      MainIcon: Instagram,
      ActionIcon: LinkIcon,
      color: '348 80% 60%', // Instagram Magenta
    },
    {
      id: 'card-facebook',
      title: 'Facebook',
      href: 'https://www.facebook.com/share/17bSPkFVov/',
      linkId: 'social-fb',
      actionText: 'Join Us',
      MainIcon: Facebook,
      ActionIcon: LinkIcon,
      color: '215 100% 50%', // Facebook Blue
    },
    {
      id: 'card-youtube',
      title: 'YouTube',
      href: 'https://www.youtube.com/@AnuvaNexus-d3c',
      linkId: 'social-yt',
      actionText: 'Subscribe',
      MainIcon: Youtube,
      ActionIcon: LinkIcon,
      color: '0 100% 50%', // YouTube Red
    },
  ];

  return (
    <section id="contact" className="py-28 md:py-36 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="noise-overlay absolute inset-0 opacity-10" />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-[150px]"
          style={{ background: 'radial-gradient(circle, #00ffff 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Headline */}
        <motion.div
          id="contact-headline-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#00ffff] font-mono mb-3 block">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white font-serif italic mb-4">
            Ready to find peace?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md mx-auto tracking-wide">
            Connect with Sarvi AI across our official channels or send us a direct message.
          </p>
        </motion.div>

        {/* Mouse Spotlight Hover Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div
            id="cards"
            ref={cardsContainerRef}
            className="flex flex-wrap gap-6 justify-center max-w-6xl mx-auto"
          >
            {cardsData.map((item) => {
              const MainIcon = item.MainIcon;
              const ActionIcon = item.ActionIcon;

              return (
                <div
                  key={item.id}
                  className="card"
                  style={{ '--color': item.color } as React.CSSProperties}
                >
                  <div className="card_content">
                    <div className="flex flex-col items-center justify-center my-auto gap-3">
                      <MainIcon className="w-16 h-16 card_icon stroke-[1.25]" />
                      <h2>{item.title}</h2>
                    </div>

                    <a
                      id={item.linkId}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ActionIcon size={14} />
                      <span>{item.actionText}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
