import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Crown, 
  Cpu, 
  Palette, 
  LineChart, 
  Users, 
  Megaphone, 
  ChevronRight, 
  X, 
  Linkedin, 
  Twitter, 
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { TeamMember } from '../types/appTypes';

export interface TeamCategoryMember extends TeamMember {
  initials: string;
}

export interface TeamCategory {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
  accentColor: string;
  badge: string;
  members: TeamCategoryMember[];
}

const TEAM_CATEGORIES: TeamCategory[] = [
  {
    id: 'leadership',
    title: 'Leadership',
    shortDesc: 'Provides overall strategic vision, operational excellence, and long-term growth direction.',
    icon: <Crown className="w-6 h-6 text-[#00ffff]" />,
    accentColor: '180 100% 50%',
    badge: 'Executive Board',
    members: [
      {
        id: 'subhajit-sinha',
        name: 'Subhajit Sinha',
        designation: 'Founder & CEO',
        roleDescription: "Provides strategic leadership and oversees the company's vision, direction, and long-term growth.",
        imageUrl: '',
        initials: 'SS'
      },
      {
        id: 'soham-chatterjee',
        name: 'Soham Chatterjee',
        designation: 'Co-Founder & COO',
        roleDescription: 'Leads operational execution, organizational development, and day-to-day business operations.',
        imageUrl: '',
        initials: 'SC'
      }
    ]
  },
  {
    id: 'tech-design',
    title: 'Technology & Design',
    shortDesc: 'Engineers AI systems, technology strategy, UI/UX, and end-to-end creative digital experience.',
    icon: <Cpu className="w-6 h-6 text-[#00ffff]" />,
    accentColor: '210 100% 55%',
    badge: 'Engineering & Creative',
    members: [
      {
        id: 'atif-khan',
        name: 'Atif Khan',
        designation: 'Head of Design',
        roleDescription: "Leads the company's design vision while overseeing UI/UX, branding, graphic design, and creative assets across ANUVA NEXUS.",
        imageUrl: '',
        initials: 'AK'
      },
      {
        id: 'deep-mahanta',
        name: 'Deep Mahanta',
        designation: 'Head of Technology',
        roleDescription: "Directs the company's technology strategy and leads the development of AI-powered products and digital experiences.",
        imageUrl: '',
        initials: 'DM'
      }
    ]
  },
  {
    id: 'finance',
    title: 'Finance',
    shortDesc: 'Ensures strategic financial planning, risk compliance, budgeting, and fiscal integrity.',
    icon: <LineChart className="w-6 h-6 text-[#00ffff]" />,
    accentColor: '165 100% 45%',
    badge: 'Financial Operations',
    members: [
      {
        id: 'sarbani-singh',
        name: 'Sarbani Singh',
        designation: 'Finance Consultant',
        roleDescription: 'Provides financial planning, budgeting, compliance, and strategic financial guidance.',
        imageUrl: '',
        initials: 'SS'
      }
    ]
  },
  {
    id: 'business-social',
    title: 'Business & Social Media',
    shortDesc: 'Drives strategic partnerships, client relations, digital presence, and audience engagement.',
    icon: <Users className="w-6 h-6 text-[#00ffff]" />,
    accentColor: '195 100% 50%',
    badge: 'Growth & Outreach',
    members: [
      {
        id: 'subhajit-mishra',
        name: 'Subhajit Mishra',
        designation: 'Business Relationship Manager & Social Media Coordinator',
        roleDescription: "Manages client relationships, partnerships, and the company's social media presence.",
        imageUrl: '',
        initials: 'SM'
      },
      {
        id: 'srestha-sarkar',
        name: 'Srestha Sarkar',
        designation: 'Social Media Executive',
        roleDescription: 'Plans content strategy, manages social media platforms, and drives audience engagement.',
        imageUrl: '',
        initials: 'SS'
      }
    ]
  }
];

export default function TeamSection() {
  const [selectedCategory, setSelectedCategory] = useState<TeamCategory | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCategory(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCategory]);

  return (
    <section id="team" className="py-24 md:py-36 relative overflow-hidden bg-[#050505] border-t border-white/5">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-b from-[#00ffff]/10 via-blue-600/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <motion.span
            id="team-badge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.4em] text-[#00ffff] mb-4 block font-mono"
          >
            ANUVA NEXUS TEAM
          </motion.span>

          <motion.h2
            id="team-title"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-6"
          >
            Meet the Team
          </motion.h2>

          <motion.p
            id="team-description"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Meet the passionate people behind ANUVA NEXUS who are building innovative AI solutions for the future.
          </motion.p>
        </div>

        {/* 2x2 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {TEAM_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              id={`team-category-${category.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              className="group relative rounded-3xl p-8 bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-[#00ffff]/50 transition-all duration-500 cursor-pointer backdrop-blur-xl shadow-xl hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow inside card */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00ffff]/10 rounded-full blur-3xl group-hover:bg-[#00ffff]/20 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Header Row with Icon & Badge */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/15 group-hover:border-[#00ffff]/60 transition-colors duration-300 shadow-inner">
                    {category.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/20 text-[#00ffff] text-[10px] font-mono uppercase tracking-wider">
                    {category.members.length} {category.members.length === 1 ? 'Member' : 'Members'}
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-[#00ffff] transition-colors duration-300 mb-3 tracking-tight">
                  {category.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                  {category.shortDesc}
                </p>
              </div>

              {/* Card Footer: Member Avatars Preview & Explore Action */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                {/* Avatar Stack */}
                <div className="flex items-center -space-x-2">
                  {category.members.map((m) => (
                    <div
                      key={m.id}
                      className="w-9 h-9 rounded-full bg-gradient-to-b from-[#111827] to-[#0a0c14] border-2 border-[#050505] flex items-center justify-center text-xs font-semibold text-[#00ffff] shadow-md"
                      title={m.name}
                    >
                      {m.initials}
                    </div>
                  ))}
                </div>

                {/* Interactive Action Button */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-300 group-hover:text-[#00ffff] transition-colors">
                  <span>View Team</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote Banner */}
        <motion.div
          id="team-bottom-statement"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-cyan-950/30 via-blue-950/20 to-cyan-950/30 border border-[#00ffff]/20 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,255,0.06)] relative overflow-hidden">
            <Sparkles className="w-6 h-6 text-[#00ffff] mx-auto mb-4 animate-pulse" />
            <p className="text-lg md:text-xl font-serif text-white/90 leading-relaxed tracking-tight">
              "Together, we are building practical, impactful AI-driven solutions designed for the future."
            </p>
            <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.4em] text-[#00ffff]/80">
              ANUVA NEXUS VISION
            </div>
          </div>
        </motion.div>
      </div>

      {/* Expanded Category Modal / Drawer */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto smooth-scroll">
            {/* Modal Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedCategory(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-3xl bg-[#0a0d14] border border-[#00ffff]/30 rounded-3xl shadow-[0_0_60px_rgba(0,255,255,0.15)] overflow-hidden z-10 my-auto p-6 md:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-[#00ffff]/20 hover:text-[#00ffff] text-gray-400 transition-colors cursor-pointer"
                title="Close Modal"
              >
                <X size={18} />
              </button>

              {/* Modal Category Navigation Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/10 no-scrollbar pr-12 smooth-scroll-x">
                {TEAM_CATEGORIES.map((cat) => {
                  const isActive = cat.id === selectedCategory.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? 'bg-[#00ffff]/20 border border-[#00ffff] text-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.2)]'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {cat.title}
                    </button>
                  );
                })}
              </div>

              {/* Modal Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3.5 rounded-2xl bg-[#00ffff]/10 border border-[#00ffff]/30 text-[#00ffff]">
                  {selectedCategory.icon}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white">
                    {selectedCategory.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light mt-1">
                    {selectedCategory.shortDesc}
                  </p>
                </div>
              </div>

              {/* Category Team Members Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCategory.members.map((member) => (
                  <div
                    key={member.id}
                    className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-[#00ffff]/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Avatar & Monogram */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#151c2c] to-[#0a0d14] border-2 border-[#00ffff]/50 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <span className="font-krona text-base text-[#00ffff] tracking-wider">
                              {member.initials}
                            </span>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-base font-serif text-white group-hover:text-[#00ffff] transition-colors truncate">
                            {member.name}
                          </h4>
                          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/20 text-[#00ffff] text-[10px] font-mono uppercase tracking-wider truncate max-w-full">
                            {member.designation}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">
                        {member.roleDescription}
                      </p>
                    </div>

                    {/* Social links bar */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2 text-gray-500">
                      <a
                        href="#linkedin"
                        aria-label={`${member.name} LinkedIn`}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00ffff]/10 hover:text-[#00ffff] border border-white/5 hover:border-[#00ffff]/30 transition-all"
                      >
                        <Linkedin size={13} />
                      </a>
                      <a
                        href="#twitter"
                        aria-label={`${member.name} Twitter`}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00ffff]/10 hover:text-[#00ffff] border border-white/5 hover:border-[#00ffff]/30 transition-all"
                      >
                        <Twitter size={13} />
                      </a>
                      <a
                        href="#contact"
                        aria-label={`Email ${member.name}`}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00ffff]/10 hover:text-[#00ffff] border border-white/5 hover:border-[#00ffff]/30 transition-all"
                      >
                        <Mail size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

