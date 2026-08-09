import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star, ArrowUpRight } from 'lucide-react';
import { WorkItem } from '../types/appTypes';

const WORK_ITEMS: WorkItem[] = [
  {
    id: 'emerging-talent',
    number: '01',
    title: 'Always Here to\nListen',
    description: 'Talk to Sarvi AI anytime, day or night. Receive thoughtful, judgment-free conversations whenever you need emotional support.',
    gradientClass: 'from-[#1a4d7f] to-[#04040a]',
    icon: 'star',
    isDarkCard: true,
    accentColor: '#0052cc',
  },
  {
    id: 'evolving-legacy',
    number: '02',
    title: 'Understand Your\nFeelings',
    description: "Sarvi AI recognizes emotional patterns and provides personalized insights to help you better understand your mental well-being.",
    gradientClass: 'from-[#111111] to-[#070707]',
    icon: 'arrow-up-right',
    isDarkCard: false,
    accentColor: '#00ffff',
  },
  {
    id: 'hyper-scale',
    number: '03',
    title: 'Track Your\nProgress',
    description: 'Monitor your daily mood, discover emotional trends, and celebrate your journey toward a healthier, happier mindset.',
    gradientClass: 'from-[#0b2b2b] to-[#010a0a]',
    icon: 'star',
    isDarkCard: true,
    accentColor: '#00e5ff',
  },
  {
    id: 'digital-monolith',
    number: '04',
    title: 'Safe &\nConfidential',
    description: 'Your conversations stay private. Built with strong security and complete confidentiality so you can speak freely.',
    gradientClass: 'from-[#0a1024] to-[#02050e]',
    icon: 'arrow-up-right',
    isDarkCard: false,
    accentColor: '#00b0ff',
  },
];

interface ScrollWorkCardProps {
  key?: string;
  item: WorkItem;
  index: number;
}

function ScrollWorkCard({ item, index }: ScrollWorkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeftCard = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Calculate dynamic animations based on scroll progress:
  const yParallax = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.93, 1, 1, 0.93]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], isLeftCard ? [-2, 0, 2] : [2, 0, -2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <motion.div
      ref={cardRef}
      id={`work-card-wrapper-${item.id}`}
      style={{
        y: yParallax,
        scale,
        rotate,
        opacity,
      }}
      className={`w-full ${isLeftCard ? 'md:translate-y-0' : 'md:mt-32'}`}
    >
      <div
        id={`work-card-${item.id}`}
        className={`relative overflow-hidden rounded-[2.5rem] p-10 md:p-14 aspect-[4/5] flex flex-col justify-between shadow-2xl transition-all duration-700 group border ${
          item.isDarkCard
            ? `bg-gradient-to-br ${item.gradientClass} border-white/5`
            : 'bg-[#111111] border-white/5'
        }`}
      >
        {/* Card Header Info */}
        <div id={`card-header-${item.id}`} className="flex justify-between items-start z-10">
          <div
            id={`card-icon-container-${item.id}`}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 ${
              item.isDarkCard
                ? 'bg-white/10'
                : 'bg-white/5'
            }`}
          >
            {item.icon === 'star' ? (
              <Star className="text-white text-2xl w-6 h-6" />
            ) : (
              <ArrowUpRight className="text-white text-2xl w-6 h-6" />
            )}
          </div>
          <span className="text-white/60 font-mono text-sm border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            {item.number}
          </span>
        </div>

        {/* Card Body Title & Description */}
        <div id={`card-body-${item.id}`} className="z-10 mt-12">
          <h3 className="text-4xl sm:text-5xl md:text-[3.25rem] text-white mb-6 leading-[1.05] tracking-tighter font-serif whitespace-pre-line">
            {item.title}
          </h3>
          <p className={`text-base leading-relaxed ${item.isDarkCard ? 'text-white/85' : 'text-gray-400'}`}>
            {item.description}
          </p>
        </div>

        {/* Aesthetic card shine backdrop */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="works" className="py-56 relative overflow-hidden bg-[#070707]">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title Header */}
        <div id="works-header-section" className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.h2
            id="works-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif leading-none tracking-tighter text-white"
          >
            What Sarvi <br />
            Offers
          </motion.h2>
          
          <motion.p
            id="works-subtitle"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 max-w-xs text-xs uppercase tracking-[0.25em] leading-loose"
          >
            Everything you need to understand your emotions, build healthier habits, and receive compassionate AI support all in one place.
          </motion.p>
        </div>

        {/* Selected Works Cards Grid */}
        <div id="works-grid" className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {WORK_ITEMS.map((item, index) => (
            <ScrollWorkCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Background Interactive Pattern */}
      <div id="works-radial-pattern" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>
    </section>
  );
}
