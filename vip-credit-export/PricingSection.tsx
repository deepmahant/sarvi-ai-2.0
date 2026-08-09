import { motion } from 'motion/react';
import { Check, ArrowRight, Clock, Crown } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  currencySymbol?: string;
  duration?: string;
  description: string;
  features: string[];
  isPopular: boolean;
  cta: string;
  accentColor: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free Tier',
    price: '0',
    currencySymbol: '₹',
    duration: 'Forever',
    description: 'Start your supportive companion journey with Sarvi AI.',
    features: [
      '10 Free Credits',
      'AI Mental Companion',
      'Mood Tracking & Daily Log',
      'Daily Wellness Check-ins',
      'Private & Secure Conversations',
    ],
    isPopular: false,
    cta: 'Get Started',
    accentColor: '#ffffff',
  },
  {
    id: 'vip',
    name: 'SARVI AI Plus',
    price: '29',
    currencySymbol: '₹',
    duration: 'PLUS Tier',
    description: 'The premium Plus plan for continuous care and enhanced AI support.',
    features: [
      '100 Credits included',
      'Enhanced AI Experience',
      'Faster Memory & Context Recall',
      'Priority AI Responses',
      'Premium SARVI AI Plus Badge',
      'Early Access to New Features',
      'Supports Continuous Development',
    ],
    isPopular: true,
    cta: 'Upgrade to SARVI AI Plus',
    accentColor: '#f59e0b',
  },
  {
    id: 'topup',
    name: 'Credit Top-Up',
    price: 'Starting at ₹9',
    description: 'Recharge only when you need additional conversations.',
    features: [
      '20 Credits — ₹9',
      '30 Credits — ₹13',
      '50 Credits — ₹19',
      'Credits Never Expire',
      'Instant Wallet Recharge',
      'Recharge Anytime',
    ],
    isPopular: false,
    cta: 'Buy Credits',
    accentColor: '#00ffff',
  },
];

interface PricingSectionProps {
  onSelectPlan?: () => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-56 relative overflow-hidden bg-[#050505] border-t border-white/5">
      {/* Elegant Atmospheric Ambient Glows */}
      <div id="pricing-ambient-glow" className="absolute inset-0 pointer-events-none select-none z-0">
        <div 
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #00ffff 0%, transparent 100%)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.02] blur-[150px]"
          style={{ background: 'radial-gradient(circle, #0055ff 0%, transparent 100%)' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div id="pricing-header-container" className="max-w-4xl mx-auto text-center mb-24">
          <motion.span
            id="pricing-kicker"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.5em] text-[#00ffff] mb-6 block font-mono"
          >
            PRICING
          </motion.span>
          
          <motion.h2
            id="pricing-title"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tighter text-white mb-8"
          >
            Simple & Transparent Pricing
          </motion.h2>

          <motion.p
            id="pricing-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light"
          >
            Choose the plan that fits your journey. Start for free, upgrade for more conversations, or recharge anytime with flexible credit packs.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div id="pricing-cards-grid" className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto items-stretch">
          {PRICING_TIERS.map((tier, index) => {
            return (
              <motion.div
                key={tier.id}
                id={`pricing-card-wrapper-${tier.id}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border p-8 md:p-10 transition-all duration-500 ${
                  tier.isPopular 
                    ? 'border-amber-400/50 bg-[linear-gradient(135deg,rgba(245,158,11,0.16),rgba(17,19,34,0.95),rgba(7,20,2,0.95))] shadow-[0_24px_70px_rgba(245,158,11,0.16)] md:-translate-y-3 hover:border-amber-300 hover:shadow-[0_28px_80px_rgba(245,158,11,0.24)]' 
                    : 'border-white/10 bg-[#111]/40 hover:border-white/20 hover:bg-[#161616]/70'
                }`}
              >
                {/* Visual Popular Badge */}
                {tier.isPopular && (
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-3 py-1.5 text-amber-300 shadow-sm">
                    <span className="text-[8px] uppercase tracking-[0.3em] font-bold font-mono">VIP PICK</span>
                  </div>
                )}

                <div>
                  {/* Tier Title */}
                  <span className={`mb-2 block text-[10px] uppercase tracking-[0.25em] font-mono ${
                    tier.isPopular ? 'font-semibold text-amber-400' : 'text-gray-500'
                  }`}>
                    {tier.isPopular ? 'Premium Plan' : `Tier ${index + 1}`}
                  </span>
                  <div className="mb-6 flex items-center gap-2">
                    {tier.isPopular && <Crown size={18} className="text-amber-300" />}
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {tier.name}
                    </h3>
                  </div>

                  {/* Pricing Number */}
                  <div className="mb-8 flex items-baseline gap-1">
                    {tier.currencySymbol && (
                      <span className={`text-xl font-light font-sans ${tier.isPopular ? 'text-amber-300' : 'text-gray-400'}`}>
                        {tier.currencySymbol}
                      </span>
                    )}
                    <span className="text-4xl sm:text-5xl font-semibold tracking-tighter text-white font-mono">
                      {tier.price}
                    </span>
                    {tier.duration && (
                      <span className={`text-xs tracking-wider font-light uppercase ml-1.5 ${
                        tier.isPopular ? 'text-amber-300/80' : 'text-gray-500'
                      }`}>
                        {tier.duration}
                      </span>
                    )}
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-gray-400 leading-relaxed font-light mb-10 pb-8 border-b border-white/5">
                    {tier.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-3 text-[10px] uppercase tracking-[0.35em] text-gray-500">What’s included</div>
                  <div className="space-y-4 mb-12">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          tier.isPopular 
                            ? 'bg-amber-400/20 border-amber-400/40' 
                            : 'bg-white/5 border-white/10'
                        }`}>
                          <Check size={10} className={tier.isPopular ? 'text-amber-300 stroke-[3]' : 'text-[#00ffff]'} />
                        </div>
                        <span className="text-xs text-gray-300 leading-relaxed font-light">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action Button */}
                <button
                  id={`cta-button-${tier.id}`}
                  onClick={() => {
                    if (onSelectPlan) {
                      onSelectPlan();
                    } else {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 text-[10px] uppercase tracking-[0.3em] font-semibold transition-all duration-300 ${
                    tier.isPopular
                      ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black shadow-[0_10px_28px_rgba(245,158,11,0.28)] hover:scale-[1.01] hover:shadow-[0_12px_32px_rgba(245,158,11,0.38)]'
                      : 'border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white hover:text-black'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note banner */}
        <motion.div
          id="pricing-guarantee-banner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-20 border border-white/5 bg-[#111]/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-[#00ffff]/5 border border-[#00ffff]/20 flex items-center justify-center text-[#00ffff] shrink-0 mt-0.5">
              <Clock size={16} />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white font-semibold">PEAK HOURS NOTICE</h4>
              <div className="text-[10px] text-gray-400 font-light mt-2 space-y-2 leading-relaxed">
                <p>
                  To ensure smooth performance during high-demand periods, Sarvi AI uses dynamic credit usage.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-1">
                  <div>
                    <span className="text-[#00ffff] font-medium block mb-0.5">🕒 Peak Hours:</span>
                    <span className="text-gray-300 block">6:30 AM – 9:30 AM IST</span>
                    <span className="text-gray-300 block">11:30 AM – 3:30 PM IST</span>
                  </div>
                  <div>
                    <span className="text-white font-medium block mb-0.5">Credit Rate:</span>
                    <span className="block text-gray-300">During these hours: <span className="text-[#00ffff] font-medium">2 Credits</span> = 1 AI Conversation</span>
                    <span className="text-gray-500 block">During Standard Hours: 1 Credit = 1 AI Conversation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0 font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-2 md:mt-0">
            <Clock size={12} className="text-[#00ffff]" />
            <span>DYNAMIC CREDIT SYSTEM</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
