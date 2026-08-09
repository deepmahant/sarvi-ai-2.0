import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedOrb from '../components/AnimatedOrb';
import { OrbState, Message, MoodLog, Memory, Session } from '../types/chatTypes';
import { 
  Heart, 
  Sparkles, 
  Send, 
  Clock, 
  Activity, 
  Compass, 
  CreditCard, 
  LogOut, 
  Shield, 
  Zap, 
  Menu,
  X,
  Brain,
  Flame,
  CheckCircle2,
  Sparkle,
  AlertTriangle,
  Filter,
  Trash2,
  History,
  Plus,
  MessageSquare,
  Pencil,
  Check,
  Star,
  Crown,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

interface ChatDashboardPageProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

const SEND_BUTTON_STYLING: Record<OrbState, {
  gradientClass: string;
  shadowStyle: string;
  hoverShadowStyle: string;
}> = {
  calm: {
    gradientClass: 'from-[#1d4ed8] via-[#2563eb] to-[#00d2ff]',
    shadowStyle: 'rgba(37, 99, 235, 0.4)',
    hoverShadowStyle: 'rgba(0, 210, 255, 0.65)'
  },
  happy: {
    gradientClass: 'from-[#0891b2] via-[#06b6d4] to-[#10b981]',
    shadowStyle: 'rgba(6, 182, 212, 0.45)',
    hoverShadowStyle: 'rgba(16, 185, 129, 0.7)'
  },
  excited: {
    gradientClass: 'from-[#ea580c] via-[#f97316] to-[#f59e0b]',
    shadowStyle: 'rgba(234, 88, 12, 0.45)',
    hoverShadowStyle: 'rgba(245, 158, 11, 0.7)'
  },
  sad: {
    gradientClass: 'from-[#1e1b4b] via-[#1d4ed8] to-[#3b82f6]',
    shadowStyle: 'rgba(29, 78, 216, 0.3)',
    hoverShadowStyle: 'rgba(59, 130, 246, 0.55)'
  },
  encouraging: {
    gradientClass: 'from-[#7c3aed] via-[#db2777] to-[#f43f5e]',
    shadowStyle: 'rgba(219, 39, 119, 0.45)',
    hoverShadowStyle: 'rgba(244, 63, 94, 0.7)'
  },
  hopeful: {
    gradientClass: 'from-[#10b981] via-[#0d9488] to-[#0ea5e9]',
    shadowStyle: 'rgba(16, 185, 129, 0.45)',
    hoverShadowStyle: 'rgba(14, 165, 233, 0.7)'
  },
  thinking: {
    gradientClass: 'from-[#4f46e5] via-[#6366f1] to-[#818cf8]',
    shadowStyle: 'rgba(99, 102, 241, 0.45)',
    hoverShadowStyle: 'rgba(165, 180, 252, 0.7)'
  },
  listening: {
    gradientClass: 'from-[#0284c7] via-[#0ea5e9] to-[#00ffff]',
    shadowStyle: 'rgba(6, 182, 212, 0.5)',
    hoverShadowStyle: 'rgba(0, 255, 255, 0.75)'
  }
};

const ORB_THEME_COLORS: Record<OrbState, {
  from: string;
  via: string;
  to: string;
  glow: string;
}> = {
  calm: { from: '#1d4ed8', via: '#2563eb', to: '#00d2ff', glow: 'rgba(37,99,235,0.45)' },
  happy: { from: '#06b6d4', via: '#10b981', to: '#67e8f9', glow: 'rgba(6,182,212,0.55)' },
  excited: { from: '#f59e0b', via: '#ef4444', to: '#fbbf24', glow: 'rgba(245,158,11,0.6)' },
  sad: { from: '#1d4ed8', via: '#1e1b4b', to: '#3b82f6', glow: 'rgba(29,78,216,0.3)' },
  encouraging: { from: '#db2777', via: '#7c3aed', to: '#f43f5e', glow: 'rgba(219,39,119,0.5)' },
  hopeful: { from: '#10b981', via: '#06b6d4', to: '#38bdf8', glow: 'rgba(16,185,129,0.5)' },
  thinking: { from: '#6366f1', via: '#4f46e5', to: '#a5b4fc', glow: 'rgba(99,102,241,0.5)' },
  listening: { from: '#00ffff', via: '#0284c7', to: '#38bdf8', glow: 'rgba(0,255,255,0.55)' },
};

interface SarviBrandLogoProps {
  isPremium: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showBadge?: boolean;
}

const SarviBrandLogo: React.FC<SarviBrandLogoProps> = React.memo(({
  isPremium,
  size = 'md',
  className = '',
  showBadge = true
}) => {
  const sizeMap = {
    sm: 'text-xs tracking-[0.16em]',
    md: 'text-xs sm:text-sm tracking-[0.18em]',
    lg: 'text-base sm:text-lg tracking-[0.22em]'
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`font-krona ${sizeMap[size]} text-white transition-all`}>
        {isPremium ? (
          <span className="bg-gradient-to-r from-white via-cyan-100 to-[#00ffff] bg-clip-text text-transparent">
            SARVI AI
          </span>
        ) : (
          <span className="bg-gradient-to-r from-white via-white to-[#00ffff] bg-clip-text text-transparent">
            SARVI AI
          </span>
        )}
      </span>

      {isPremium && showBadge && (
        <motion.span
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-widest text-[#00ffff] bg-gradient-to-r from-[#00ffff]/20 via-blue-500/15 to-[#0055ff]/20 border border-[#00ffff]/35 backdrop-blur-md shadow-[0_0_12px_rgba(0,255,255,0.25)] shrink-0"
        >
          <Sparkles size={9} className="text-[#00ffff] animate-pulse" />
          <span>Plus</span>
        </motion.span>
      )}
    </div>
  );
});

/* MEMOIZED CHAT MESSAGE ITEM - ChatGPT Style Typography & Readability with Fast Typewriter Streaming */
const ChatMessageItem = React.memo(function ChatMessageItem({
  msg,
  userName,
  isPremium,
  isLatest
}: {
  msg: Message;
  userName: string;
  isPremium: boolean;
  isLatest?: boolean;
}) {
  const isUser = msg.sender === 'user';
  const textToRender = msg.text;

  return (
    <div className={`flex flex-col transform-gpu transition-all duration-200 ${isUser ? 'items-end' : 'items-start'}`}>
      <div className="flex items-center gap-2 mb-1.5 px-1">
        <span className={`text-[11px] font-medium font-sans tracking-tight ${isUser ? 'text-gray-300' : 'text-[#a5d8ff] font-semibold'}`}>
          {isUser ? userName : 'SARVI AI'}
        </span>
        <span className="text-[10px] text-gray-400 font-mono">{msg.timestamp}</span>
      </div>

      <div
        className={`relative text-[13.5px] sm:text-[14.5px] leading-relaxed font-sans font-normal tracking-normal whitespace-pre-wrap ${
          isUser
            ? 'bg-white/10 border border-white/10 text-white rounded-[2rem] rounded-br-[0.75rem] px-5 py-4 shadow-[0_12px_40px_rgba(255,255,255,0.06)] max-w-[88%] sm:max-w-[78%] md:max-w-[68%]'
            : 'bg-[#0d2b5b] border border-[#4d7cff]/30 text-white rounded-[2rem] rounded-br-[0.75rem] px-5 py-5 shadow-[0_18px_50px_rgba(6,82,204,0.25)] max-w-[92%] sm:max-w-[85%] md:max-w-[76%]'
        }`}
      >
        {textToRender}

        {!isUser && (
          <div className="mt-4 flex items-center gap-2 text-[10px] text-[#b8d8ff] uppercase tracking-[0.25em] font-mono opacity-90">
            <span>SARVI AI</span>
          </div>
        )}
      </div>
    </div>
  );
});

/* MEMOIZED TYPING INDICATOR */
const ChatTypingIndicator = React.memo(function ChatTypingIndicator({
  isPremium,
  orbState
}: {
  isPremium: boolean;
  orbState: OrbState;
}) {
  return (
    <div className="flex flex-col items-start transform-gpu transition-all duration-150">
      <div className="flex items-center gap-2 mb-1 px-1">
        <span className="text-[11px] text-[#00ffff] font-sans font-semibold flex items-center gap-1.5">
          <Sparkle size={10} className="text-[#00ffff]" />
          <span>{isPremium ? 'Sarvi AI Plus is reflecting' : 'Sarvi AI is reflecting'}</span>
        </span>
      </div>

      <div 
        className="relative overflow-hidden rounded-2xl rounded-tl-xs px-4 py-3 sm:px-5 sm:py-3.5 border border-white/10 backdrop-blur-xl bg-[#0e111a]/90 shadow-md flex items-center gap-3"
        style={{
          boxShadow: `0 4px 20px rgba(0,0,0,0.4), inset 0 0 12px ${ORB_THEME_COLORS[orbState].glow}`
        }}
      >
        <div 
          className="absolute -inset-full opacity-20 pointer-events-none animate-pulse-slow"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${ORB_THEME_COLORS[orbState].from} 0%, ${ORB_THEME_COLORS[orbState].via} 50%, transparent 80%)`,
            filter: 'blur(20px)'
          }}
        />

        <div className="typing-dots relative z-10 flex items-center gap-2">
          <span className="typing-dot bg-[#00ffff]" />
          <span className="typing-dot bg-[#38bdf8]" />
          <span className="typing-dot bg-[#60a5fa]" />
        </div>

        <span className="text-xs text-gray-400 font-sans font-normal relative z-10">
          attuning to your thoughts...
        </span>
      </div>
    </div>
  );
});

/* MEMOIZED CHAT MESSAGES FEED WITH INTELLIGENT ULTRA-SMOOTH AUTO-SCROLL & MESSAGE WINDOWING */
const ChatMessageFeed = React.memo(function ChatMessageFeed({
  messages,
  isAiTyping,
  userName,
  isPremium,
  orbState
}: {
  messages: Message[];
  isAiTyping: boolean;
  userName: string;
  isPremium: boolean;
  orbState: OrbState;
}) {
  const feedRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);
  const isUserScrolledUpRef = useRef(false);
  const [visibleLimit, setVisibleLimit] = useState(60);

  // Windowing for long conversations
  const visibleMessages = useMemo(() => {
    if (messages.length <= visibleLimit) return messages;
    return messages.slice(messages.length - visibleLimit);
  }, [messages, visibleLimit]);

  const hiddenCount = messages.length - visibleMessages.length;

  const handleLoadOlder = useCallback(() => {
    setVisibleLimit(prev => prev + 50);
  }, []);

  const handleScroll = useCallback(() => {
    if (!feedRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = feedRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const isScrolledUp = distanceFromBottom > 90;
    isUserScrolledUpRef.current = isScrolledUp;
    setShowScrollBottomBtn(isScrolledUp);
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'end' });
    }
  }, []);

  // Smooth scroll when new messages arrive or AI typing status updates
  useEffect(() => {
    if (!isUserScrolledUpRef.current) {
      const timer = setTimeout(() => {
        scrollToBottom(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, isAiTyping, scrollToBottom]);

  // ResizeObserver on the feed to ensure fluid height expansion stays anchored smoothly at bottom
  useEffect(() => {
    if (!feedRef.current) return;
    const observer = new ResizeObserver(() => {
      if (!isUserScrolledUpRef.current) {
        scrollToBottom(false);
      }
    });
    observer.observe(feedRef.current);
    return () => observer.disconnect();
  }, [scrollToBottom]);

  // Handle VisualViewport resize/scroll for mobile keyboard opening and closing
  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const handleVisualViewportChange = () => {
      if (!isUserScrolledUpRef.current) {
        scrollToBottom(false);
      }
    };

    window.visualViewport.addEventListener('resize', handleVisualViewportChange, { passive: true });
    window.visualViewport.addEventListener('scroll', handleVisualViewportChange, { passive: true });
    return () => {
      window.visualViewport?.removeEventListener('resize', handleVisualViewportChange);
      window.visualViewport?.removeEventListener('scroll', handleVisualViewportChange);
    };
  }, [scrollToBottom]);

  // Listen to focus events triggered when typing on mobile
  useEffect(() => {
    const handleFocusEvent = () => {
      if (!isUserScrolledUpRef.current) {
        scrollToBottom(true);
      }
    };
    window.addEventListener('chat_focus_input', handleFocusEvent);
    return () => window.removeEventListener('chat_focus_input', handleFocusEvent);
  }, [scrollToBottom]);

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <div
        ref={feedRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-5 pr-1 sm:pr-3 scrollbar-thin scrollbar-thumb-white/10 transform-gpu will-change-transform overscroll-contain smooth-scroll"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {hiddenCount > 0 && (
          <div className="flex justify-center py-2">
            <button
              onClick={handleLoadOlder}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-400 hover:text-white transition-all cursor-pointer font-mono"
            >
              Load {hiddenCount} older message{hiddenCount > 1 ? 's' : ''}
            </button>
          </div>
        )}

        {visibleMessages.map((msg, idx) => (
          <ChatMessageItem
            key={`chat-msg-${idx}`}
            msg={msg}
            userName={userName}
            isPremium={isPremium}
            isLatest={idx === visibleMessages.length - 1}
          />
        ))}

        {isAiTyping && (
          <ChatTypingIndicator isPremium={isPremium} orbState={orbState} />
        )}

        <div ref={chatEndRef} className="h-1" />
      </div>

      {/* Floating Smooth Scroll To Bottom Pill */}
      <AnimatePresence>
        {showScrollBottomBtn && (
          <motion.button
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => {
              isUserScrolledUpRef.current = false;
              setShowScrollBottomBtn(false);
              scrollToBottom(true);
            }}
            className="absolute bottom-3 right-3 sm:right-6 z-20 px-3.5 py-1.5 rounded-full bg-[#0a101f]/90 border border-[#00ffff]/40 text-[#00ffff] text-[11px] font-sans font-semibold shadow-[0_4px_20px_rgba(0,255,255,0.25)] backdrop-blur-md flex items-center gap-1.5 hover:bg-[#00ffff] hover:text-black transition-all cursor-pointer group"
          >
            <span>Latest messages</span>
            <ArrowDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
});

/* QUICK PROMPT SUGGESTIONS */
const QUICK_PROMPTS = [
  { label: '✨ Handle Stress', prompt: 'I feel a bit overwhelmed right now. Can you guide me through a grounding exercise?' },
  { label: '💭 Reframe Thought', prompt: 'I want to reframe a negative thought I had today.' },
  { label: '🌙 Evening Reflection', prompt: 'Can we reflect on my day and what went well?' },
  { label: '🎯 Focus Boost', prompt: 'I need advice on how to stay focused on my priority task.' },
];

/* MEMOIZED CHAT INPUT BAR FOR INSTANT 60FPS TYPING RESPONSE */
const ChatInputBar = React.memo(function ChatInputBar({
  onSendMessage,
  orbState,
  isPeakHours
}: {
  onSendMessage: (text: string) => void;
  orbState: OrbState;
  isPeakHours: boolean;
}) {
  const [inputValue, setInputValue] = useState('');
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    onSendMessage(inputValue.trim());
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFocus = () => {
    window.dispatchEvent(new Event('chat_focus_input'));
    setTimeout(() => window.dispatchEvent(new Event('chat_focus_input')), 120);
    setTimeout(() => window.dispatchEvent(new Event('chat_focus_input')), 280);
  };

  const handleQuickPromptClick = (promptText: string) => {
    onSendMessage(promptText);
  };

  return (
    <div className="relative z-10 shrink-0 mt-2 sm:mt-3 transform-gpu space-y-2 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x smooth-scroll-x">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
          <Sparkles size={11} className="text-[#00ffff]" /> Prompts:
        </span>
        {QUICK_PROMPTS.map((qp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickPromptClick(qp.prompt)}
            className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#00ffff]/40 hover:bg-[#00ffff]/10 text-gray-300 hover:text-[#00ffff] text-[11px] font-sans transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm active:scale-95"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Main Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <div 
          className="relative flex items-center bg-[#0a0c16]/95 backdrop-blur-2xl border border-white/15 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl hover:border-white/25 focus-within:border-[#00ffff]/60 focus-within:ring-2 focus-within:ring-[#00ffff]/20 focus-within:shadow-[0_0_25px_rgba(0,255,255,0.15)] transition-all duration-300"
          style={{
            boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 0 16px ${ORB_THEME_COLORS[orbState].glow}`
          }}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            inputMode="text"
            placeholder="Type your message or share your mind..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            className="w-full bg-transparent text-sm sm:text-[14.5px] text-white placeholder-gray-400 focus:outline-none pr-3 pl-1 font-sans font-normal tracking-normal resize-none leading-normal my-auto max-h-32 scrollbar-thin scrollbar-thumb-white/10 touch-manipulation"
          />

          {/* Controls Right */}
          <div className="flex items-center gap-1.5 shrink-0 my-auto">
            {inputValue && (
              <button
                type="button"
                onClick={() => {
                  setInputValue('');
                  if (textareaRef.current) textareaRef.current.style.height = 'auto';
                }}
                className="p-2 sm:p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                title="Clear"
              >
                <X size={14} />
              </button>
            )}

            <button
              type="submit"
              disabled={!inputValue.trim()}
              onMouseEnter={() => setIsBtnHovered(true)}
              onMouseLeave={() => setIsBtnHovered(false)}
              style={{
                boxShadow: isBtnHovered 
                  ? `0 0 20px ${SEND_BUTTON_STYLING[orbState].hoverShadowStyle}`
                  : `0 0 10px ${SEND_BUTTON_STYLING[orbState].shadowStyle}`
              }}
              className={`p-2.5 sm:p-2.5 rounded-xl bg-gradient-to-r ${SEND_BUTTON_STYLING[orbState].gradientClass} text-white hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:hover:scale-100 disabled:shadow-none cursor-pointer flex items-center justify-center shrink-0 touch-manipulation`}
              title="Send Message"
            >
              <Send size={15} className="text-white fill-current" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

/* MEMOIZED MEMORIES VIEW */
const MemoriesView = React.memo(function MemoriesView({
  memories,
  isPremium,
  onAddMemory,
  onRemoveMemory
}: {
  memories: Memory[];
  isPremium: boolean;
  onAddMemory: (text: string) => void;
  onRemoveMemory: (id: string) => void;
}) {
  const [newMemoryText, setNewMemoryText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryText.trim()) return;
    onAddMemory(newMemoryText.trim());
    setNewMemoryText('');
  };

  return (
    <motion.div
      key="memories-tab"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto space-y-6 transform-gpu"
    >
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-2.5 backdrop-blur-md">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#00ffff] font-semibold">Context Memory</span>
        <h3 className="text-lg font-serif text-white font-medium">What {isPremium ? 'Sarvi AI VIP' : 'Sarvi AI'} Remembers About You</h3>
        <p className="text-xs text-gray-300 font-sans leading-relaxed max-w-xl">
          To offer deeply personalized conversations, {isPremium ? 'Sarvi AI VIP' : 'Sarvi AI'} remembers key milestones you share. You hold total control—add or delete memories anytime.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="text"
          placeholder="Add a custom memory (e.g., 'Working on my daily sleep schedule')..."
          value={newMemoryText}
          onChange={(e) => setNewMemoryText(e.target.value)}
          className="flex-grow bg-[#090b12] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffff]/40 transition-all font-sans"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-[#00ffff] hover:text-black hover:border-transparent text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer text-white shrink-0"
        >
          Add Memory
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {memories.map((mem) => (
          <div
            key={mem.id}
            className="bg-[#090b12] border border-white/10 hover:border-white/20 rounded-xl p-4.5 flex flex-col justify-between space-y-3 transition-all"
          >
            <div className="space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#00ffff] bg-[#00ffff]/10 border border-[#00ffff]/20 px-2 py-0.5 rounded">
                {mem.category}
              </span>
              <p className="text-xs text-gray-200 font-sans leading-relaxed">
                "{mem.text}"
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-2 border-t border-white/5">
              <span>Recorded: {mem.timestamp}</span>
              <button
                onClick={() => onRemoveMemory(mem.id)}
                className="text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

/* MEMOIZED TIMELINE VIEW */
const TimelineView = React.memo(function TimelineView({
  moodLogs,
  moodFilter,
  setMoodFilter,
  reflectionFeedback,
  setReflectionFeedback,
  onDeleteMoodLog,
  streakCount,
  nextCheckInText,
  onOpenCheckInModal
}: {
  moodLogs: MoodLog[];
  moodFilter: string;
  setMoodFilter: (filter: string) => void;
  reflectionFeedback: 'helpful' | 'not-really' | 'dismissed' | null;
  setReflectionFeedback: (fb: 'helpful' | 'not-really' | 'dismissed' | null) => void;
  onDeleteMoodLog: (id: string, index: number) => void;
  streakCount: number;
  nextCheckInText: string;
  onOpenCheckInModal: () => void;
}) {
  const filteredLogs = useMemo(() => {
    return moodLogs.filter(log => moodFilter === 'All' || log.mood.toLowerCase() === moodFilter.toLowerCase());
  }, [moodLogs, moodFilter]);

  return (
    <motion.div
      key="timeline-tab"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto space-y-6 transform-gpu"
    >
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-2.5 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#00ffff] font-semibold">Emotional Analytics</span>
          <h3 className="text-lg font-serif text-white font-medium">Your Emotional Journey & 24-Hour Check-In Timeline</h3>
          <p className="text-xs text-gray-300 font-sans leading-relaxed max-w-xl">
            Review how your feelings evolve over time. Check-ins occur automatically every 24 hours and are stored here permanently.
          </p>
        </div>

        <button
          onClick={onOpenCheckInModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00ffff] to-[#0055ff] text-black font-semibold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0 self-start sm:self-center flex items-center gap-2"
        >
          <CheckCircle2 size={14} />
          <span>Log Check-In</span>
        </button>
      </div>

      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-semibold font-mono text-gray-200">Weekly Mood Resonance Curve</span>
          <span className="text-[9px] font-mono text-[#00ffff] bg-[#00ffff]/10 border border-[#00ffff]/20 px-2 py-0.5 rounded">Stable Baseline</span>
        </div>

        <div className="relative h-40 w-full pt-3">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00ffff" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 10 90 Q 90 20, 170 60 T 330 30 T 490 60 L 490 120 L 10 120 Z"
              fill="url(#chartGradient)"
            />
            <path
              d="M 10 90 Q 90 20, 170 60 T 330 30 T 490 60"
              fill="none"
              stroke="#00ffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="10" cy="90" r="3.5" fill="#00ffff" />
            <circle cx="125" cy="38" r="3.5" fill="#00ffff" />
            <circle cx="250" cy="50" r="3.5" fill="#00ffff" />
            <circle cx="370" cy="35" r="3.5" fill="#00ffff" />
            <circle cx="490" cy="60" r="3.5" fill="#00ffff" />
          </svg>
          <div className="flex justify-between text-[10px] font-mono text-gray-400 uppercase tracking-widest px-2 mt-2">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {reflectionFeedback !== 'dismissed' && (
          <motion.div
            key="weekly-reflection-card"
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="bg-gradient-to-br from-[#111322] via-[#080912] to-transparent border border-[#00ffff]/20 rounded-2xl p-5 relative overflow-hidden"
          >
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-widest text-[#00ffff] font-mono font-bold flex items-center gap-1.5">
                  <Sparkle size={10} />
                  <span>Weekly Reflection</span>
                </span>
                <button
                  onClick={() => setReflectionFeedback('dismissed')}
                  className="text-gray-400 hover:text-white text-xs"
                  title="Dismiss"
                >
                  ✕
                </button>
              </div>

              <h4 className="text-sm font-serif italic text-white">
                "This week, you've shown incredible resilience in the face of pressure."
              </h4>
              <p className="text-xs text-gray-300 font-sans leading-relaxed max-w-2xl">
                According to your conversation attunements, your emotional landscape has shifted towards a more centered baseline. Speaking your thoughts openly has released some workload stress.
              </p>

              <div className="flex items-center gap-3 pt-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Was this summary helpful?</span>
                {reflectionFeedback === null ? (
                  <>
                    <button
                      onClick={() => setReflectionFeedback('helpful')}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#00ffff]/30 text-gray-200 hover:text-[#00ffff] text-[10px] uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Helpful 👍
                    </button>
                    <button
                      onClick={() => setReflectionFeedback('not-really')}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/20 text-gray-200 hover:text-red-400 text-[10px] uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Not Really 👎
                    </button>
                  </>
                ) : (
                  <span className="text-[10px] text-[#00ffff] font-medium tracking-wide">
                    {reflectionFeedback === 'helpful' ? 'Thank you for your response! 💙' : 'We will continue improving reflections. 🌸'}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-5 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <h4 className="text-sm font-serif text-white font-medium flex items-center gap-2">
              <History size={15} className="text-[#00ffff]" />
              <span>Historic 24-Hour Check-In Record</span>
            </h4>
            <p className="text-xs text-gray-400 font-sans mt-0.5">
              Permanent chronological history of your daily check-in logs.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[9px] font-mono text-gray-400 uppercase block">Check-Ins</span>
              <span className="text-xs font-semibold font-mono text-[#00ffff]">{moodLogs.length}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[9px] font-mono text-gray-400 uppercase block">Streak</span>
              <span className="text-xs font-semibold font-mono text-emerald-400">{streakCount}d 🔥</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[9px] font-mono text-gray-400 uppercase block">Next Auto</span>
              <span className="text-xs font-semibold font-mono text-amber-300">{nextCheckInText}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter size={11} /> Filter:
          </span>
          {['All', 'Great', 'Good', 'Okay', 'Struggling', 'Exhausted'].map(f => (
            <button
              key={f}
              onClick={() => setMoodFilter(f)}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                moodFilter === f
                  ? 'bg-[#00ffff]/15 border border-[#00ffff]/40 text-[#00ffff] font-semibold'
                  : 'bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredLogs.map((log, idx) => (
            <div
              key={log.id || `log-${idx}`}
              className="p-4 bg-[#05060a] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-white/20 transition-all"
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <span className="text-2xl bg-white/5 border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  {log.emoji}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-[10px] uppercase tracking-wider font-semibold font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10"
                      style={{ color: log.color, borderColor: `${log.color}33` }}
                    >
                      {log.mood}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {log.time}
                    </span>
                  </div>
                  {log.notes ? (
                    <p className="text-xs text-gray-200 font-sans italic leading-relaxed">
                      "{log.notes}"
                    </p>
                  ) : (
                    <p className="text-[11px] text-gray-500 font-sans italic">
                      No additional notes added.
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => onDeleteMoodLog(log.id!, idx)}
                className="self-end sm:self-center p-1.5 rounded-lg opacity-80 sm:opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all cursor-pointer"
                title="Delete entry"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <div className="p-8 text-center bg-[#05060a] border border-dashed border-white/10 rounded-xl space-y-2">
              <Clock size={20} className="mx-auto text-gray-500" />
              <p className="text-xs text-gray-300 font-sans">No check-in entries match the "{moodFilter}" filter.</p>
              <button
                onClick={() => setMoodFilter('All')}
                className="text-[10px] font-mono text-[#00ffff] underline cursor-pointer"
              >
                Reset filter to view all entries
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

/* MEMOIZED RELATIONSHIP VIEW */
const RelationshipView = React.memo(function RelationshipView({
  isPremium,
  onboardingName,
  user,
  streakCount,
  moodLogsCount,
  memoriesCount
}: {
  isPremium: boolean;
  onboardingName: string;
  user: { name: string; email: string };
  streakCount: number;
  moodLogsCount: number;
  memoriesCount: number;
}) {
  return (
    <motion.div
      key="relationship-tab"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto space-y-6 transform-gpu"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-semibold flex items-center gap-1.5">
              <Flame size={12} className="fill-current" />
              <span>Active Streak</span>
            </span>
            <h4 className="text-xs font-semibold text-gray-200 mt-2">Consistent Connection</h4>
          </div>
          <div className="flex items-baseline gap-1.5 mt-4">
            <span className="text-3xl font-mono font-bold text-white">{streakCount}</span>
            <span className="text-[10px] text-orange-400 uppercase tracking-widest font-mono">Days Streak</span>
          </div>
          <p className="text-[10px] text-gray-400 font-sans leading-relaxed mt-2">
            You have logged check-ins for {streakCount} days in a row!
          </p>
        </div>

        <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00ffff] font-semibold flex items-center gap-1.5">
              <Heart size={12} className="fill-current" />
              <span>Resonance</span>
            </span>
            <h4 className="text-xs font-semibold text-gray-200 mt-2">Emotional Alignment</h4>
          </div>
          <div className="flex items-baseline gap-1.5 mt-4">
            <span className="text-3xl font-mono font-bold text-white">92%</span>
            <span className="text-[10px] text-[#00ffff] uppercase tracking-widest font-mono">Attuned</span>
          </div>
          <p className="text-[10px] text-gray-400 font-sans leading-relaxed mt-2">
            Deep empathic resonance achieved through thoughtful sharing.
          </p>
        </div>

        <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1.5">
              <Brain size={12} />
              <span>Memories Retained</span>
            </span>
            <h4 className="text-xs font-semibold text-gray-200 mt-2">Context Knowledge</h4>
          </div>
          <div className="flex items-baseline gap-1.5 mt-4">
            <span className="text-3xl font-mono font-bold text-white">{memoriesCount}</span>
            <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-mono">Core Facts</span>
          </div>
          <p className="text-[10px] text-gray-400 font-sans leading-relaxed mt-2">
            Sarvi AI remembers key context points about your daily journey.
          </p>
        </div>
      </div>

      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-6 sm:p-8 text-center space-y-6 backdrop-blur-md relative overflow-hidden">
        <div className="max-w-md mx-auto space-y-2 relative z-10">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#00ffff] font-semibold">Bond Progress</span>
          <h3 className="text-xl font-serif text-white">Empathic Growth Alignment</h3>
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Your connection with {isPremium ? 'Sarvi AI VIP' : 'Sarvi AI'} develops continuously as you log check-ins, share thoughts, and release mental weight.
          </p>
        </div>

        <div className="py-4 flex items-center justify-center relative">
          <div className="w-44 h-44 rounded-full border border-[#00ffff]/30 flex items-center justify-center relative bg-gradient-to-b from-[#00ffff]/10 via-transparent to-transparent shadow-[0_0_40px_rgba(0,255,255,0.1)]">
            <div className="w-32 h-32 rounded-full border border-[#00ffff]/50 flex items-center justify-center animate-pulse-slow">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#00ffff] to-blue-600 opacity-80 blur-md" />
            </div>
            <span className="absolute font-krona text-xs text-white tracking-widest drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
              LEVEL 4
            </span>
          </div>
        </div>

        <div className="space-y-1.5 relative z-10 max-w-md mx-auto">
          <h4 className="text-sm font-serif text-white">Empathic Growth Alignment</h4>
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            This sphere reflects your overall connection depth with {isPremium ? 'Sarvi AI VIP' : 'Sarvi AI'}. As you log check-ins, resolve workload pressures, and share your mind, our empathic alignment grows closer.
          </p>
        </div>
      </div>
    </motion.div>
  );
});

/* MEMOIZED UPGRADE VIEW */
const UpgradeView = React.memo(function UpgradeView({
  isPremium,
  credits,
  onUpgradeToPremium,
  onCancelSubscription,
  onBuyCredits
}: {
  isPremium: boolean;
  credits: number;
  onUpgradeToPremium: () => void;
  onCancelSubscription: () => void;
  onBuyCredits: (amount: number, credits: number, isProPlan?: boolean) => void;
}) {
  return (
    <motion.div
      key="upgrade-tab"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto space-y-8 transform-gpu"
    >
      {/* Wallet Status Banner */}
      <div className={`bg-[#090b12] border rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 backdrop-blur-md transition-all ${
        isPremium
          ? 'border-amber-400/40 bg-gradient-to-r from-amber-950/20 via-[#0a1128] to-cyan-950/20 shadow-[0_0_30px_rgba(245,158,11,0.1)]'
          : 'border-white/10'
      }`}>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00ffff] font-semibold">Subscription Management</span>
            {isPremium && (
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold text-amber-300 bg-amber-500/15 border border-amber-400/30 flex items-center gap-1">
                <Crown size={10} /> ACTIVE VIP
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-sm font-serif text-gray-200">Active Tier:</span>
            <SarviBrandLogo isPremium={isPremium} size="md" />
          </div>

          <p className="text-xs text-gray-300 font-sans leading-relaxed max-w-md">
            {isPremium 
              ? 'You are currently subscribed to SARVI AI VIP! Enjoy enhanced AI responses, priority context recall, and VIP branding across your workspace.'
              : 'Upgrade your experience to unlock SARVI AI VIP branding, priority responses, and faster context memory.'}
          </p>
          {isPremium && (
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onCancelSubscription}
                className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
              >
                Cancel Subscription
              </button>
            </div>
          )}
        </div>

        <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-baseline gap-2 shrink-0 self-start sm:self-center">
          <span className="text-3xl font-mono font-bold text-white">{credits}</span>
          <span className="text-[10px] text-[#00ffff] uppercase tracking-widest font-mono">Cr Left</span>
        </div>
      </div>

      {/* Featured Hero Plan: SARVI AI VIP (₹29) */}
      <div className="space-y-4">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block">Featured Tier</span>
          <h3 className="text-lg font-serif text-white font-semibold">SARVI AI VIP</h3>
        </div>

        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/15 via-[#0e0f1a] to-amber-950/20 border-2 border-amber-400/50 shadow-[0_0_35px_rgba(245,158,11,0.15)] hover:shadow-[0_0_50px_rgba(245,158,11,0.25)] hover:border-amber-300 transition-all duration-300 overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all duration-500 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                  <Star size={11} className="fill-amber-300 text-amber-300" />
                  ★ MOST POPULAR
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-serif text-white font-bold flex items-center gap-2">
                  SARVI AI VIP
                </h4>
                <p className="text-xs text-amber-200/80 font-sans mt-1">
                  The complete VIP AI experience for continuous care and deep conversations.
                </p>
              </div>

              {/* Exact Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  '100 Credits + Free 50 Credits included',
                  'Enhanced AI Experience',
                  'Faster Memory & Context Recall',
                  'Priority AI Responses',
                  'Premium SARVI AI VIP Badge',
                  'Early Access to New Features',
                  'Supports Continuous Development'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-amber-300 stroke-[3]" />
                    </div>
                    <span className="text-xs text-gray-200 font-sans">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action Box */}
            <div className="w-full md:w-auto p-6 rounded-2xl bg-black/40 border border-amber-400/30 flex flex-col items-center justify-center text-center gap-4 shrink-0 shadow-lg min-w-[220px]">
              <div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-xl font-sans text-amber-300 font-light">₹</span>
                  <span className="text-4xl font-mono font-extrabold text-white">29</span>
                </div>
                <span className="text-[10px] text-amber-300/90 font-mono font-semibold block mt-0.5">100 + 50 Free Credits Included</span>
              </div>

              <button
                onClick={() => onBuyCredits(29, 100, true)}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-[1.02] transition-all cursor-pointer"
              >
                Upgrade to SARVI AI VIP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Top-Up Section */}
      <div className="space-y-4 pt-2">
        <div>
          <h4 className="text-base font-serif text-white font-medium">Credit Top-Up</h4>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Recharge only when you need additional conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-[#090b12] border border-white/10 hover:border-white/20 rounded-2xl space-y-4 flex flex-col justify-between transition-all group">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Normal Top-Up</span>
              <h5 className="text-sm font-semibold text-white">20 Credits</h5>
            </div>
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-mono font-bold text-white">₹9</span>
                <span className="text-[10px] text-gray-400 font-mono">20 Credits</span>
              </div>
              <button
                onClick={() => onBuyCredits(9, 20)}
                className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Recharge ₹9
              </button>
            </div>
          </div>

          <div className="p-5 bg-[#090b12] border border-white/10 hover:border-white/20 rounded-2xl space-y-4 flex flex-col justify-between transition-all group">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Standard Top-Up</span>
              <h5 className="text-sm font-semibold text-white">30 Credits</h5>
            </div>
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-mono font-bold text-white">₹13</span>
                <span className="text-[10px] text-gray-400 font-mono">30 Credits</span>
              </div>
              <button
                onClick={() => onBuyCredits(13, 30)}
                className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Recharge ₹13
              </button>
            </div>
          </div>

          <div className="p-5 bg-[#090b12] border border-white/10 hover:border-white/20 rounded-2xl space-y-4 flex flex-col justify-between transition-all group">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-[#00ffff] uppercase tracking-widest block font-bold">Popular Top-Up</span>
              <h5 className="text-sm font-semibold text-white">50 Credits</h5>
            </div>
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-mono font-bold text-white">₹19</span>
                <span className="text-[10px] text-[#00ffff] font-mono font-bold">50 Credits</span>
              </div>
              <button
                onClick={() => onBuyCredits(19, 50)}
                className="w-full py-2.5 rounded-xl border border-[#00ffff]/30 bg-[#00ffff]/10 text-[#00ffff] hover:bg-[#00ffff]/20 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Recharge ₹19
              </button>
            </div>
          </div>
        </div>

        {/* Small note underneath */}
        <div className="flex items-center gap-3 p-4 bg-[#090b12] border border-white/10 rounded-xl text-xs text-gray-400 font-sans">
          <Shield size={15} className="text-[#00ffff] shrink-0" />
          <span>Credits are added instantly to your wallet and never expire.</span>
        </div>
      </div>
    </motion.div>
  );
});

/* MEMOIZED DAILY CHECK-IN MODAL */
const CheckInModal = React.memo(function CheckInModal({
  showCheckInModal,
  lastCheckInTime,
  nextCheckInText,
  checkInMood,
  setCheckInMood,
  checkInEmoji,
  setCheckInEmoji,
  checkInNote,
  setCheckInNote,
  onSaveCheckIn,
  onSkipCheckIn,
  TWENTY_FOUR_HOURS_MS
}: {
  showCheckInModal: boolean;
  lastCheckInTime: number | null;
  nextCheckInText: string;
  checkInMood: string;
  setCheckInMood: (m: string) => void;
  checkInEmoji: string;
  setCheckInEmoji: (e: string) => void;
  checkInNote: string;
  setCheckInNote: (n: string) => void;
  onSaveCheckIn: () => void;
  onSkipCheckIn: () => void;
  TWENTY_FOUR_HOURS_MS: number;
}) {
  if (!showCheckInModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="checkin-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          id="checkin-modal"
          initial={{ scale: 0.95, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: -10, opacity: 0 }}
          className="w-full max-w-md bg-[#090a12] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto smooth-scroll scrollbar-thin scrollbar-thumb-white/10 transform-gpu"
        >
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/20 text-[#00ffff] font-mono text-[10px] uppercase tracking-wider">
              <Clock size={11} />
              <span>
                {!lastCheckInTime || (Date.now() - lastCheckInTime >= TWENTY_FOUR_HOURS_MS)
                  ? '24-Hour Timer • Check-In Due'
                  : `Next check-in ${nextCheckInText}`}
              </span>
            </div>
            <h3 className="text-base font-semibold text-white tracking-wide uppercase font-mono text-[#00ffff]">Daily Emotional Check-In</h3>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              Reflect on your emotions today. Completing this saves a permanent log to your Timeline history.
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[
              { label: 'Great', emoji: '😀' },
              { label: 'Good', emoji: '🙂' },
              { label: 'Okay', emoji: '😐' },
              { label: 'Struggling', emoji: '😔' },
              { label: 'Exhausted', emoji: '😴' }
            ].map((m) => (
              <button
                key={m.label}
                onClick={() => { setCheckInMood(m.label); setCheckInEmoji(m.emoji); }}
                className={`p-2 sm:p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                  checkInMood === m.label
                    ? 'bg-[#00ffff]/15 border-[#00ffff] shadow-[0_0_12px_rgba(0,255,255,0.2)]'
                    : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="text-xl sm:text-2xl">{m.emoji}</span>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-300 font-mono">{m.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-mono text-gray-400 block">What's on your mind today? (Optional)</label>
            <textarea
              placeholder="Record your thoughts, triumphs, or challenges..."
              value={checkInNote}
              onChange={(e) => setCheckInNote(e.target.value)}
              rows={3}
              className="w-full bg-[#05060a] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffff]/40 transition-all resize-none font-sans leading-relaxed"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onSkipCheckIn}
              className="w-[30%] py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
            >
              Skip
            </button>
            <button
              onClick={onSaveCheckIn}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#00ffff] to-[#0055ff] text-black font-semibold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all cursor-pointer"
            >
              Save Check-In
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

/* MEMOIZED CREDITS MODAL */
const CreditsModal = React.memo(function CreditsModal({
  showCreditsModal,
  setShowCreditsModal,
  onBuyCredits
}: {
  showCreditsModal: boolean;
  setShowCreditsModal: (show: boolean) => void;
  onBuyCredits: (amount: number, credits: number, isProPlan?: boolean) => void;
}) {
  if (!showCreditsModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="credits-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto smooth-scroll"
      >
        <motion.div
          id="credits-modal"
          initial={{ scale: 0.95, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: -10, opacity: 0 }}
          className="w-full max-w-lg bg-[#0a0c16] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 transform-gpu my-auto max-h-[90vh] overflow-y-auto smooth-scroll scrollbar-thin scrollbar-thumb-white/10"
        >
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-bold">Pricing & Credits</span>
            <h3 className="text-lg font-serif text-white font-semibold">Choose Your Plan</h3>
          </div>

          {/* Primary Featured Gold Card: SARVI AI Plus */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-[#111322] to-amber-950/20 border-2 border-amber-400/50 shadow-[0_0_25px_rgba(245,158,11,0.15)] space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[9px] font-mono font-bold tracking-wider uppercase flex items-center gap-1">
                <Star size={10} className="fill-amber-300 text-amber-300" /> ★ MOST POPULAR
              </span>
              <span className="text-sm font-mono font-extrabold text-amber-300">₹29</span>
            </div>

            <div>
              <h4 className="text-base font-serif text-white font-bold">SARVI AI Plus</h4>
              <p className="text-xs text-amber-200/80 font-sans mt-0.5">100 Credits included & premium AI perks</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 border-t border-amber-400/20">
              {[
                '100 Credits included',
                'Enhanced AI Experience',
                'Faster Memory & Context Recall',
                'Priority AI Responses',
                'Premium SARVI AI Plus Badge',
                'Early Access to New Features',
                'Supports Continuous Development'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-200">
                  <Check size={11} className="text-amber-300 shrink-0" />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                onBuyCredits(29, 100, true);
                setShowCreditsModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all cursor-pointer"
            >
              Upgrade to SARVI AI VIP
            </button>
          </div>

          {/* Top-Up Section */}
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-serif text-white font-semibold">Credit Top-Up</h4>
              <p className="text-[11px] text-gray-400 font-sans">
                Recharge only when you need additional conversations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onBuyCredits(10, 20);
                  setShowCreditsModal(false);
                }}
                className="p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-white">20 Credits</h5>
                  <span className="text-[10px] text-gray-400 font-mono">₹10</span>
                </div>
                <div className="mt-3 text-[10px] font-mono text-[#00ffff] font-semibold uppercase tracking-wider">
                  Recharge ₹10
                </div>
              </button>

              <button
                onClick={() => {
                  onBuyCredits(20, 50);
                  setShowCreditsModal(false);
                }}
                className="p-3.5 rounded-xl border border-[#00ffff]/30 bg-[#00ffff]/10 hover:bg-[#00ffff]/20 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-white">50 Credits</h5>
                  <span className="text-[10px] text-[#00ffff] font-mono">₹20</span>
                </div>
                <div className="mt-3 text-[10px] font-mono text-[#00ffff] font-semibold uppercase tracking-wider">
                  Recharge ₹20
                </div>
              </button>
            </div>

            <p className="text-[10px] text-gray-400 text-center font-sans pt-1">
              Credits are added instantly to your wallet and never expire.
            </p>
          </div>

          <button
            onClick={() => setShowCreditsModal(false)}
            className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

/* MAIN DASHBOARD COMPONENT */
export default function ChatDashboardPage({ user, onLogout }: ChatDashboardPageProps) {
  // User Subscription Plan State ('free' | 'premium')
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>(() => {
    const saved = localStorage.getItem(`sarvi_user_plan_${user.email}`);
    if (saved === 'premium' || saved === 'pro') return 'premium';
    if (user.email.toLowerCase().includes('pro') || user.email.toLowerCase().includes('premium') || user.name.toLowerCase().includes('pro')) {
      return 'premium';
    }
    return 'free';
  });

  const isPremium = userPlan === 'premium';

  // Persist User Subscription Plan
  useEffect(() => {
    localStorage.setItem(`sarvi_user_plan_${user.email}`, userPlan);
  }, [userPlan, user.email]);

  // Onboarding States
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(() => {
    return localStorage.getItem(`sarvi_onboarded_${user.email}`) === 'true';
  });
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [onboardingName, setOnboardingName] = useState<string>(user.name || '');
  const [onboardingReason, setOnboardingReason] = useState<'growth' | 'support' | null>(null);
  const [onboardingOrbIndex, setOnboardingOrbIndex] = useState<number>(0);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'chat' | 'memories' | 'timeline' | 'relationship' | 'upgrade'>('chat');
  
  // Sidebar State for Mobile Drawer
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dynamic Visual Viewport & Mobile Keyboard Tracking
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateViewport = () => {
      if (window.visualViewport) {
        const height = window.visualViewport.height;
        setViewportHeight(height);
        document.documentElement.style.setProperty('--visual-viewport-height', `${height}px`);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewport, { passive: true });
      window.visualViewport.addEventListener('scroll', updateViewport, { passive: true });
      updateViewport();
    } else {
      window.addEventListener('resize', updateViewport, { passive: true });
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewport);
        window.visualViewport.removeEventListener('scroll', updateViewport);
      } else {
        window.removeEventListener('resize', updateViewport);
      }
    };
  }, []);

  // Modals States
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);

  // Credits System
  const [credits, setCredits] = useState<number>(() => {
    const saved = localStorage.getItem(`sarvi_credits_${user.email}`);
    if (saved) return parseInt(saved, 10);
    return isPremium ? 100 : 15;
  });

  // Dynamic Credits Rates (Peak hours calculation)
  const [isPeakHours, setIsPeakHours] = useState(false);

  // Daily Check-In & Mood States with 24-Hour Timer Persistence
  const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
  
  const [lastCheckInTime, setLastCheckInTime] = useState<number | null>(() => {
    const saved = localStorage.getItem(`sarvi_last_checkin_timestamp_${user.email}`);
    return saved ? parseInt(saved, 10) : null;
  });

  const [hasSkippedInSession, setHasSkippedInSession] = useState<boolean>(false);
  const [checkInMood, setCheckInMood] = useState<string>('Okay');
  const [checkInEmoji, setCheckInEmoji] = useState<string>('😐');
  const [checkInNote, setCheckInNote] = useState<string>('');
  const [moodFilter, setMoodFilter] = useState<string>('All');

  // Crisis Alert State
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);

  // Weekly Reflection States
  const [reflectionFeedback, setReflectionFeedback] = useState<'helpful' | 'not-really' | 'dismissed' | null>(null);

  // Active Chat and Previous Session manager
  const [activeSessionId, setActiveSessionId] = useState<string>('session-current');
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem(`sarvi_sessions_${user.email}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'session-1',
        title: 'Workload & Anxiety Relief',
        date: 'Yesterday, 8:40 PM',
        sentiment: 'Calm',
        messages: [
          { id: '1', sender: 'user', text: 'I am feeling highly anxious about an upcoming presentation.', timestamp: '8:35 PM' },
          { id: '2', sender: 'ai', text: 'Breathe in slowly with me. Your presentation is just a small moment in time, and your worth is not defined by it. Let\'s outline your ideas gently.', timestamp: '8:36 PM' },
          { id: '3', sender: 'user', text: 'Thank you, that helps release some pressure.', timestamp: '8:40 PM' }
        ]
      },
      {
        id: 'session-2',
        title: 'Mindfulness Baseline Setting',
        date: '3 days ago, 11:15 AM',
        sentiment: 'Grateful',
        messages: [
          { id: '1', sender: 'user', text: 'I want to build a better daily self-reflection habit.', timestamp: '11:10 AM' },
          { id: '2', sender: 'ai', text: 'A beautiful goal. Consistency starts with small steps—like checking in with yourself for just 2 minutes every morning.', timestamp: '11:15 AM' }
        ]
      }
    ];
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: `Hello ${onboardingName || user.name}. I am Sarvi AI, your gentle emotional companion. Whenever you feel overwhelmed, tired, or just need a safe space to place your thoughts, I am always here to listen. How are you holding up today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [isAiTyping, setIsAiTyping] = useState(false);

  // Orb Emotional State
  const [orbState, setOrbState] = useState<OrbState>('calm');

  // Persist sessions to LocalStorage
  useEffect(() => {
    localStorage.setItem(`sarvi_sessions_${user.email}`, JSON.stringify(sessions));
  }, [sessions, user.email]);

  // Keep active session in sync with messages
  useEffect(() => {
    if (!activeSessionId) return;

    const userMsgs = messages.filter(m => m.sender === 'user');
    if (userMsgs.length === 0) return;

    const firstUserText = userMsgs[0].text;
    const title = firstUserText.length > 28 ? firstUserText.slice(0, 28) + '...' : firstUserText;
    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setSessions(prev => {
      const existingIndex = prev.findIndex(s => s.id === activeSessionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          title: updated[existingIndex].title === 'New Chat' || updated[existingIndex].title === 'Current Chat' ? title : updated[existingIndex].title,
          messages: messages,
          date: 'Today, ' + formattedTime
        };
        return updated;
      } else {
        const newSession: Session = {
          id: activeSessionId,
          title: title || 'Mental Check-in',
          date: 'Today, ' + formattedTime,
          sentiment: orbState === 'happy' || orbState === 'excited' ? 'Positive' : orbState === 'sad' ? 'Reflective' : 'Calm',
          messages: messages
        };
        return [newSession, ...prev];
      }
    });
  }, [messages, activeSessionId, orbState]);

  // Memories State
  const [memories, setMemories] = useState<Memory[]>([
    { id: 'mem-1', text: 'Prefers being called ' + (onboardingName || user.name), category: 'Identity', timestamp: 'Today' },
    { id: 'mem-2', text: 'Working on overcoming presentation and work anxiety', category: 'Growth Focus', timestamp: 'Yesterday' },
    { id: 'mem-3', text: 'Practicing regular breathing to slow down rapid thoughts', category: 'Self-Care', timestamp: '3 days ago' }
  ]);

  // Persistent Mood Logs State (Saved permanently to Timeline)
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(() => {
    const saved = localStorage.getItem(`sarvi_mood_logs_${user.email}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    const now = Date.now();
    return [
      { id: 'log-1', mood: 'Calm', emoji: '😌', color: '#00ffff', time: 'Yesterday, 8:40 PM', timestamp: now - 86400000, notes: 'Took deep breaths, feeling more in control.' },
      { id: 'log-2', mood: 'Anxious', emoji: '😰', color: '#ff5555', time: '2 days ago, 11:15 AM', timestamp: now - 172800000, notes: 'Stressed about project deadlines.' },
      { id: 'log-3', mood: 'Okay', emoji: '😐', color: '#a0aec0', time: '3 days ago, 3:30 PM', timestamp: now - 259200000 }
    ];
  });

  // Persist Mood Logs permanently
  useEffect(() => {
    localStorage.setItem(`sarvi_mood_logs_${user.email}`, JSON.stringify(moodLogs));
  }, [moodLogs, user.email]);

  // Automatic 24-Hour Daily Check-In Popup Trigger
  useEffect(() => {
    if (!hasOnboarded || hasSkippedInSession) return;

    const checkAutoTrigger = () => {
      const now = Date.now();
      const isDue = !lastCheckInTime || (now - lastCheckInTime >= TWENTY_FOUR_HOURS_MS);
      if (isDue) {
        setShowCheckInModal(true);
      }
    };

    const timer = setTimeout(checkAutoTrigger, 1000);
    const interval = setInterval(checkAutoTrigger, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [hasOnboarded, lastCheckInTime, hasSkippedInSession, TWENTY_FOUR_HOURS_MS]);

  // Helper function for countdown to next check-in
  const getNextCheckInStatus = useCallback(() => {
    if (!lastCheckInTime) return { isReady: true, text: 'Ready Now' };
    const elapsed = Date.now() - lastCheckInTime;
    if (elapsed >= TWENTY_FOUR_HOURS_MS) return { isReady: true, text: 'Ready Now' };
    const remainingMs = TWENTY_FOUR_HOURS_MS - elapsed;
    const hours = Math.floor(remainingMs / (1000 * 60 * 60));
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    return { isReady: false, text: `In ${hours}h ${minutes}m` };
  }, [lastCheckInTime, TWENTY_FOUR_HOURS_MS]);

  // Streak Counter calculation
  const streakCount = useMemo(() => {
    return moodLogs.length > 0 ? Math.max(1, Math.min(moodLogs.length, 14)) : 0;
  }, [moodLogs]);

  // Persist Credits
  useEffect(() => {
    localStorage.setItem(`sarvi_credits_${user.email}`, credits.toString());
  }, [credits, user.email]);

  // Onboarding Orb Color Cycling
  useEffect(() => {
    if (!hasOnboarded && onboardingStep === 1) {
      const interval = setInterval(() => {
        setOnboardingOrbIndex(prev => (prev + 1) % 6);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [hasOnboarded, onboardingStep]);

  // Check for Peak Hours (IST timezone)
  useEffect(() => {
    const updateTimeAndPeakStatus = () => {
      const now = new Date();
      const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istOffset = 5.5;
      const istDate = new Date(utcTime + (3600000 * istOffset));
      
      const istHours = istDate.getHours();
      const istMinutes = istDate.getMinutes();
      const currentMinutesOfDays = istHours * 60 + istMinutes;

      const startPeak1 = 6 * 60 + 30;
      const endPeak1 = 9 * 60 + 30;

      const startPeak2 = 11 * 60 + 30;
      const endPeak2 = 15 * 60 + 30;

      const peakActive = 
        (currentMinutesOfDays >= startPeak1 && currentMinutesOfDays <= endPeak1) ||
        (currentMinutesOfDays >= startPeak2 && currentMinutesOfDays <= endPeak2);

      setIsPeakHours(peakActive);
    };

    updateTimeAndPeakStatus();
    const interval = setInterval(updateTimeAndPeakStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Sync Onboarding welcome when name changes
  useEffect(() => {
    if (onboardingName) {
      setMessages(prev => {
        if (prev.length === 1 && prev[0].id === 'welcome-msg') {
          return [{
            ...prev[0],
            text: `Hello ${onboardingName}. I am Sarvi AI, your gentle emotional companion. Whenever you feel overwhelmed, tired, or just need a safe space to place your thoughts, I am always here to listen. How are you holding up today?`
          }];
        }
        return prev;
      });
    }
  }, [onboardingName]);

  // Save Onboarding Preferences
  const handleOnboardingComplete = useCallback(() => {
    localStorage.setItem(`sarvi_onboarded_${user.email}`, 'true');
    setHasOnboarded(true);
    const newMem: Memory = {
      id: `mem-${Date.now()}`,
      text: onboardingReason === 'growth' 
        ? 'Prefers focusing on 🌱 Personal Growth and well-being' 
        : 'Prefers focusing on 💙 Emotional Support and secure sharing',
      category: 'Onboarding preference',
      timestamp: 'Today'
    };
    setMemories(prev => [newMem, ...prev]);
  }, [user.email, onboardingReason]);

  // Crisis check helper
  const checkForCrisis = (text: string) => {
    const crisisKeywords = [
      'suicide', 'kill myself', 'end my life', 'want to die', 'harm myself', 
      'hurt myself', 'cutting', 'self harm', 'ending it', 'crisis'
    ];
    return crisisKeywords.some(keyword => text.toLowerCase().includes(keyword));
  };

  // Send Message Handler
  const handleSendMessage = useCallback(async (userText: string) => {
    if (!userText) return;

    if (checkForCrisis(userText)) {
      setShowCrisisAlert(true);
    }

    const cost = isPeakHours ? 2 : 1;
    if (credits < cost) {
      setShowCreditsModal(true);
      return;
    }

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setCredits(prev => Math.max(0, prev - cost));
    setOrbState('thinking');
    setIsAiTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, userName: onboardingName || user.name })
      });

      if (response.ok) {
        const data = await response.json();
        
        let nextOrbState: OrbState = 'calm';
        const textLower = data.reply.toLowerCase();
        if (textLower.includes('happy') || textLower.includes('glad') || textLower.includes('great')) {
          nextOrbState = 'happy';
        } else if (textLower.includes('excited') || textLower.includes('wonderful') || textLower.includes('amazing')) {
          nextOrbState = 'excited';
        } else if (textLower.includes('sad') || textLower.includes('sorry') || textLower.includes('heavy') || textLower.includes('pain')) {
          nextOrbState = 'sad';
        } else if (textLower.includes('encourage') || textLower.includes('brave') || textLower.includes('strong') || textLower.includes('here with you')) {
          nextOrbState = 'encouraging';
        } else if (textLower.includes('hope') || textLower.includes('bright') || textLower.includes('future') || textLower.includes('heal')) {
          nextOrbState = 'hopeful';
        }

        const aiMsg: Message = {
          id: Math.random().toString(),
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, aiMsg]);
        setOrbState(nextOrbState);
      } else {
        throw new Error('Chat API Fallback');
      }
    } catch {
      let fallbackReply = '';
      const lower = userText.toLowerCase();
      let nextOrbState: OrbState = 'calm';

      if (lower.includes('anx') || lower.includes('stress') || lower.includes('scared') || lower.includes('panic')) {
        fallbackReply = `I understand how overwhelming that feeling is, ${onboardingName || 'friend'}. Anxiety makes us feel like the ground is shaking, but your feet are planted. I'm right here with you, holding a safe space. Let's take a slow, gentle breath together and let the wave pass.`;
        nextOrbState = 'encouraging';
      } else if (lower.includes('sad') || lower.includes('hurt') || lower.includes('lonely') || lower.includes('cry')) {
        fallbackReply = `I am holding absolute space for your sadness, ${onboardingName || 'friend'}. You do not have to carry this alone or hide how you truly feel. What feels like it is adding the heaviest weight to your thoughts right now?`;
        nextOrbState = 'sad';
      } else if (lower.includes('happy') || lower.includes('good') || lower.includes('proud') || lower.includes('excited')) {
        fallbackReply = `It brings me so much warmth to hear that, ${onboardingName || 'friend'}! Celebrating these positive moments is a crucial part of your mental wellness journey. Tell me, what was the best highlight of that experience?`;
        nextOrbState = 'happy';
      } else {
        fallbackReply = `Thank you for sharing that with me, ${onboardingName || 'friend'}. Your feelings are completely valid and safe here. What else would you like to speak out loud today?`;
        nextOrbState = 'listening';
      }

      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setOrbState(nextOrbState);
    } finally {
      setIsAiTyping(false);
    }
  }, [credits, isPeakHours, onboardingName, user.name]);

  // Save Daily Check-In
  const handleSaveCheckIn = useCallback(() => {
    const now = Date.now();
    const dateObj = new Date(now);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const colorsMap: Record<string, string> = {
      'Great': '#00ff7f',
      'Good': '#00ffff',
      'Okay': '#a0aec0',
      'Struggling': '#ff5555',
      'Exhausted': '#b0c4de'
    };

    const newLog: MoodLog = {
      id: `checkin-${now}`,
      mood: checkInMood,
      emoji: checkInEmoji,
      color: colorsMap[checkInMood] || '#00ffff',
      time: `Today, ${formattedTime} (${formattedDate})`,
      timestamp: now,
      notes: checkInNote ? checkInNote.trim() : undefined
    };

    setMoodLogs(prev => [newLog, ...prev]);
    setLastCheckInTime(now);
    localStorage.setItem(`sarvi_last_checkin_timestamp_${user.email}`, now.toString());

    setCheckInNote('');
    setShowCheckInModal(false);
    setHasSkippedInSession(false);

    if (checkInMood === 'Great') setOrbState('happy');
    else if (checkInMood === 'Struggling') setOrbState('sad');
    else setOrbState('calm');

    const ackText = checkInNote
      ? `Daily Check-In Saved (${checkInEmoji} ${checkInMood}): "${checkInNote}". Your response has been recorded in your Timeline.`
      : `Daily Check-In Saved (${checkInEmoji} ${checkInMood}). Your response has been recorded in your Timeline history. How are you feeling right now?`;

    setMessages(prev => [
      ...prev,
      {
        id: `ack-${now}`,
        sender: 'ai',
        text: ackText,
        timestamp: formattedTime
      }
    ]);
  }, [checkInEmoji, checkInMood, checkInNote, user.email]);

  const handleSkipCheckIn = useCallback(() => {
    setHasSkippedInSession(true);
    setShowCheckInModal(false);
  }, []);

  const handleDeleteMoodLog = useCallback((id: string, index: number) => {
    setMoodLogs(prev => prev.filter((log, idx) => (log.id ? log.id !== id : idx !== index)));
  }, []);

  const handleAddMemory = useCallback((text: string) => {
    const newMem: Memory = {
      id: `mem-${Date.now()}`,
      text: text,
      category: 'User Added',
      timestamp: 'Just now'
    };
    setMemories(prev => [newMem, ...prev]);
  }, []);

  const handleRemoveMemory = useCallback((id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  }, []);

  const handleUpgradeToPremium = useCallback(() => {
    setUserPlan('premium');
    setCredits(prev => prev + 100);
    alert('🎉 Welcome to SARVI AI VIP!\n\nYour account is now upgraded. The SARVI AI VIP branding is active across all workspaces.');
  }, []);

  const handleCancelSubscription = useCallback(() => {
    setUserPlan('free');
    alert('Your subscription has been canceled.\n\nYour account has reverted to standard SARVI AI.');
  }, []);

  const handleBuyCredits = useCallback((amount: number, addedCredits: number, isProPlan: boolean = false) => {
    if (isProPlan || amount === 29) {
      alert(`Processing secure transaction of ₹${amount} for SARVI AI VIP Plan...`);
      setTimeout(() => {
        setUserPlan('premium');
        setCredits(prev => prev + addedCredits);
        setShowCreditsModal(false);
        alert('🎉 Welcome to SARVI AI VIP!\n\nYour VIP plan is now active across all features and interfaces.');
      }, 800);
    } else {
      alert(`Initiating secure UPI / Card recharge of ₹${amount} for ${addedCredits} Sarvi AI Credits...`);
      setTimeout(() => {
        setCredits(prev => prev + addedCredits);
        setShowCreditsModal(false);
        alert(`Recharge successful! Your Sarvi wallet has been updated with ${addedCredits} additional credits.`);
      }, 800);
    }
  }, []);

  // Chat Session Actions
  const handleStartNewChat = useCallback(() => {
    const newSessionId = `session-${Date.now()}`;
    setActiveSessionId(newSessionId);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: `Hello ${onboardingName || user.name}. I am Sarvi AI, your gentle emotional companion. Whenever you feel overwhelmed, tired, or just need a safe space to place your thoughts, I am always here to listen. How are you holding up today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    setOrbState('calm');
    setActiveTab('chat');
    setSidebarOpen(false);
  }, [onboardingName, user.name]);

  const handleSelectSession = useCallback((sessionId: string) => {
    const targetSession = sessions.find(s => s.id === sessionId);
    if (targetSession) {
      setActiveSessionId(targetSession.id);
      setMessages(targetSession.messages);
      setActiveTab('chat');
      setSidebarOpen(false);
    }
  }, [sessions]);

  const handleDeleteSession = useCallback((sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      const remaining = sessions.filter(s => s.id !== sessionId);
      if (remaining.length > 0) {
        setActiveSessionId(remaining[0].id);
        setMessages(remaining[0].messages);
      } else {
        handleStartNewChat();
      }
    }
  }, [activeSessionId, sessions, handleStartNewChat]);

  const handleStartRenameSession = useCallback((sessionId: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(sessionId);
    setEditingTitle(currentTitle);
  }, []);

  const handleSaveRenameSession = useCallback((sessionId: string, e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.stopPropagation();
    const trimmed = editingTitle.trim();
    if (trimmed) {
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, title: trimmed } : s));
    }
    setEditingSessionId(null);
    setEditingTitle('');
  }, [editingTitle]);

  const handleCancelRenameSession = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingSessionId(null);
    setEditingTitle('');
  }, []);

  return (
    <div 
      className="relative w-full max-w-full bg-[#030408] text-white font-sans antialiased overflow-hidden selection:bg-[#00ffff]/30 selection:text-white flex flex-col md:flex-row app-viewport-height"
      style={{
        height: viewportHeight ? `${viewportHeight}px` : 'var(--visual-viewport-height, 100dvh)',
        maxHeight: viewportHeight ? `${viewportHeight}px` : 'var(--visual-viewport-height, 100dvh)'
      }}
    >
      
      {/* 3D Dynamic Ambient Glow Container */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-15 blur-[120px] transition-all duration-1000"
          style={{ background: ORB_THEME_COLORS[orbState].from }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-15 blur-[120px] transition-all duration-1000"
          style={{ background: ORB_THEME_COLORS[orbState].to }}
        />
      </div>

      {/* Onboarding Overlay */}
      <AnimatePresence>
        {!hasOnboarded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              className="w-full max-w-[480px] bg-[#090A11]/90 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-mono text-[#00ffff]">
                <span>Welcome to Sarvi AI</span>
                <span>Step {onboardingStep} of 3</span>
              </div>

              {onboardingStep === 1 && (
                <div className="space-y-6 text-center">
                  <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                    <AnimatedOrb state={['calm', 'happy', 'excited', 'encouraging', 'hopeful', 'listening'][onboardingOrbIndex] as OrbState} className="w-full h-full" />
                  </div>
                  <div className="space-y-2">
                    <SarviBrandLogo isPremium={isPremium} size="lg" />
                    <p className="text-xs text-gray-300 font-sans leading-relaxed max-w-sm mx-auto">
                      A quiet, empathic space built to understand your emotions, process workload stress, and guide your daily mental alignment.
                    </p>
                  </div>
                  <button
                    onClick={() => setOnboardingStep(2)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00ffff] to-[#0055ff] text-black font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {onboardingStep === 2 && (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-base font-serif text-white font-medium">What should Sarvi AI call you?</h3>
                    <p className="text-xs text-gray-400 font-sans">Your name helps Sarvi personalize gentle check-ins.</p>
                  </div>
                  <input
                    type="text"
                    value={onboardingName}
                    onChange={(e) => setOnboardingName(e.target.value)}
                    placeholder="Enter your preferred name..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffff]/40 transition-all font-sans"
                  />
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setOnboardingStep(1)}
                      className="w-[30%] py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 text-xs uppercase font-mono tracking-wider cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setOnboardingStep(3)}
                      disabled={!onboardingName.trim()}
                      className="flex-1 py-2.5 rounded-xl bg-[#00ffff] text-black font-bold text-xs uppercase font-mono tracking-wider disabled:opacity-40 cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {onboardingStep === 3 && (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-base font-serif text-white font-medium">What is your primary focus?</h3>
                    <p className="text-xs text-gray-400 font-sans">This attunes Sarvi AI's responses to your goals.</p>
                  </div>
                  <div className="space-y-2.5">
                    <button
                      onClick={() => setOnboardingReason('growth')}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        onboardingReason === 'growth'
                          ? 'bg-[#00ffff]/10 border-[#00ffff] text-white shadow-sm'
                          : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-300'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-semibold">🌱 Personal Growth & Balance</h4>
                        <p className="text-[10px] font-sans text-gray-400 mt-0.5">Building habits, mindful check-ins, and clear thinking.</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setOnboardingReason('support')}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        onboardingReason === 'support'
                          ? 'bg-[#00ffff]/10 border-[#00ffff] text-white shadow-sm'
                          : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-300'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-semibold">💙 Emotional Relief & Safe Haven</h4>
                        <p className="text-[10px] font-sans text-gray-400 mt-0.5">Venting thoughts, anxiety relief, and private listening.</p>
                      </div>
                    </button>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setOnboardingStep(2)}
                      className="w-[30%] py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 text-xs uppercase font-mono tracking-wider cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleOnboardingComplete}
                      disabled={!onboardingReason}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#00ffff] to-[#0055ff] text-black font-bold text-xs uppercase font-mono tracking-wider disabled:opacity-40 cursor-pointer"
                    >
                      Enter Sarvi AI
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] bg-[#070910] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="p-5 space-y-6 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SarviBrandLogo isPremium={isPremium} size="sm" />
              {!isPremium && (
                <span className="text-[8px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded border bg-white/5 text-gray-400 border-white/10">
                  FREE
                </span>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5"
            >
              <X size={16} />
            </button>
          </div>

          {/* New Chat Primary Button */}
          <button
            onClick={handleStartNewChat}
            className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#00ffff]/20 via-[#0088ff]/15 to-[#0055ff]/20 border border-[#00ffff]/40 hover:border-[#00ffff] text-[#00ffff] hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-[#00ffff]/20 cursor-pointer"
          >
            <Plus size={16} />
            <span>Start New Chat</span>
          </button>

          <nav className="space-y-1 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 smooth-scroll">
            <button
              onClick={() => { setActiveTab('chat'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-[#00ffff]/15 to-transparent border border-[#00ffff]/30 text-white font-semibold shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass size={15} className={activeTab === 'chat' ? 'text-[#00ffff]' : 'text-gray-400'} />
              <span>Chat Workspace</span>
            </button>

            <button
              onClick={() => { setActiveTab('memories'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'memories'
                  ? 'bg-gradient-to-r from-[#00ffff]/15 to-transparent border border-[#00ffff]/30 text-white font-semibold shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Brain size={15} className={activeTab === 'memories' ? 'text-[#00ffff]' : 'text-gray-400'} />
              <span>Memory Vault ({memories.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('timeline'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-gradient-to-r from-[#00ffff]/15 to-transparent border border-[#00ffff]/30 text-white font-semibold shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity size={15} className={activeTab === 'timeline' ? 'text-[#00ffff]' : 'text-gray-400'} />
              <span>Timeline & History</span>
            </button>

            <button
              onClick={() => { setActiveTab('relationship'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'relationship'
                  ? 'bg-gradient-to-r from-[#00ffff]/15 to-transparent border border-[#00ffff]/30 text-white font-semibold shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart size={15} className={activeTab === 'relationship' ? 'text-[#00ffff]' : 'text-gray-400'} />
              <span>Empathic Alignment</span>
            </button>

            <button
              onClick={() => { setActiveTab('upgrade'); setSidebarOpen(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'upgrade'
                  ? 'bg-gradient-to-r from-[#00ffff]/15 to-transparent border border-[#00ffff]/30 text-white font-semibold shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <CreditCard size={15} className={activeTab === 'upgrade' ? 'text-[#00ffff]' : 'text-gray-400'} />
              <span>{isPremium ? 'Subscription & Plan' : 'Upgrade to VIP'}</span>
            </button>

            <div className="pt-4 pb-2 flex items-center justify-between px-2">
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-mono">Recent Sessions</span>
              <span className="text-[9px] font-mono text-[#00ffff] bg-[#00ffff]/10 px-1.5 py-0.5 rounded-full">{sessions.length}</span>
            </div>

            <div className="space-y-1.5">
              {sessions.length === 0 ? (
                <p className="text-[11px] text-gray-500 italic px-3 py-2">No previous sessions stored.</p>
              ) : (
                sessions.map(s => {
                  const isActive = activeTab === 'chat' && activeSessionId === s.id;
                  const isEditing = editingSessionId === s.id;

                  return (
                    <div
                      key={s.id}
                      onClick={() => {
                        if (!isEditing) handleSelectSession(s.id);
                      }}
                      className={`group relative p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isActive
                          ? 'bg-[#00ffff]/15 border-[#00ffff]/50 text-white shadow-sm ring-1 ring-[#00ffff]/30'
                          : 'bg-white/[0.02] border-white/5 text-gray-300 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      {isEditing ? (
                        <div className="flex items-center gap-1.5 w-full" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSaveRenameSession(s.id);
                              } else if (e.key === 'Escape') {
                                handleCancelRenameSession();
                              }
                            }}
                            autoFocus
                            className="flex-1 bg-black/60 border border-[#00ffff]/60 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00ffff]"
                          />
                          <button
                            type="button"
                            onClick={(e) => handleSaveRenameSession(s.id, e)}
                            className="p-1 rounded hover:bg-[#00ffff]/20 text-[#00ffff] transition-colors cursor-pointer"
                            title="Save Title"
                          >
                            <Check size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelRenameSession}
                            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                            title="Cancel"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <h5 className={`text-xs font-medium truncate ${isActive ? 'text-[#00ffff] font-semibold' : 'text-gray-200'}`}>
                              {s.title}
                            </h5>
                            <div className="flex items-center gap-2 text-[9px] text-gray-400 font-mono">
                              <span>{s.date}</span>
                              <span className="text-[#00ffff]/80">{s.sentiment}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button
                              type="button"
                              onClick={(e) => handleStartRenameSession(s.id, s.title, e)}
                              className="p-1 rounded-md hover:bg-white/10 text-gray-400 hover:text-[#00ffff] transition-all cursor-pointer"
                              title="Rename Chat"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleDeleteSession(s.id, e)}
                              className="p-1 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all cursor-pointer"
                              title="Delete Session"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-3 bg-black/40">
          <div className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-[#00ffff]" />
              <span className="text-xs font-mono font-semibold text-white">{credits} Credits</span>
            </div>
            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Available</span>
          </div>

          <div className="flex items-center justify-between px-1 pt-1">
            <div className="space-y-0.5 truncate pr-2">
              <h5 className="text-xs font-semibold text-white truncate">{onboardingName || user.name}</h5>
              <p className="text-[10px] text-gray-400 truncate font-mono">{user.email}</p>
              <div className="flex items-center gap-1">
                <span className={`text-[8px] font-mono uppercase tracking-wider ${isPremium ? 'text-[#00ffff] font-bold' : 'text-gray-500'}`}>
                  {isPremium ? '★ VIP Subscriber' : 'Free Member'}
                </span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer shrink-0"
              title="Logout"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-[#030408]/90 relative overflow-hidden">

        {/* Floating Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-3 left-3 z-40 p-2.5 rounded-xl bg-[#090b12]/80 border border-white/15 text-gray-300 hover:text-white backdrop-blur-md shadow-lg cursor-pointer"
          title="Open Navigation"
        >
          <Menu size={18} />
        </button>

        {/* Tab Views Content Container */}
        <div className={`flex-1 p-3 sm:p-6 md:p-8 pt-12 md:pt-6 min-h-0 relative ${activeTab === 'chat' ? 'overflow-hidden flex flex-col' : 'overflow-y-auto smooth-scroll scrollbar-thin scrollbar-thumb-white/10'}`}>
          
          <AnimatePresence mode="wait">
            {/* TAB 1: CHAT WORKSPACE */}
            {activeTab === 'chat' && (
              <motion.div
                key="chat-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col justify-between max-w-4xl mx-auto w-full relative z-10 transform-gpu"
              >
                {/* Crisis Banner */}
                <AnimatePresence>
                  {showCrisisAlert && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-3 p-3.5 rounded-xl bg-gradient-to-r from-red-950/80 via-red-900/60 to-red-950/80 border border-red-500/40 shadow-md flex items-start justify-between gap-3 shrink-0"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={16} />
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-bold text-red-200 uppercase tracking-wider font-mono">Immediate Support Available</h5>
                          <p className="text-[11px] text-red-300 font-sans leading-relaxed">
                            If you are experiencing severe distress or thoughts of self-harm, please reach out immediately: Call Tele-MANAS at <span className="font-bold font-mono underline">14416</span> (India) or National Helpline <span className="font-bold font-mono underline">988</span> (US).
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowCrisisAlert(false)}
                        className="text-red-400 hover:text-white p-1"
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Messages Feed */}
                <ChatMessageFeed
                  messages={messages}
                  isAiTyping={isAiTyping}
                  userName={onboardingName || user.name}
                  isPremium={isPremium}
                  orbState={orbState}
                />

                {/* Glassmorphic Animated Orb Positioned Behind Chat */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center transform-gpu">
                  <AnimatedOrb
                    state={orbState}
                    isMobileBackground={true}
                    className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px]"
                  />
                </div>

                {/* Chat Input Bar */}
                <ChatInputBar
                  onSendMessage={handleSendMessage}
                  orbState={orbState}
                  isPeakHours={isPeakHours}
                />
              </motion.div>
            )}

            {/* TAB 2: MEMORIES TAB */}
            {activeTab === 'memories' && (
              <MemoriesView
                memories={memories}
                isPremium={isPremium}
                onAddMemory={handleAddMemory}
                onRemoveMemory={handleRemoveMemory}
              />
            )}

            {/* TAB 3: TIMELINE TAB */}
            {activeTab === 'timeline' && (
              <TimelineView
                moodLogs={moodLogs}
                moodFilter={moodFilter}
                setMoodFilter={setMoodFilter}
                reflectionFeedback={reflectionFeedback}
                setReflectionFeedback={setReflectionFeedback}
                onDeleteMoodLog={handleDeleteMoodLog}
                streakCount={streakCount}
                nextCheckInText={getNextCheckInStatus().text}
                onOpenCheckInModal={() => setShowCheckInModal(true)}
              />
            )}

            {/* TAB 4: RELATIONSHIP TAB */}
            {activeTab === 'relationship' && (
              <RelationshipView
                isPremium={isPremium}
                onboardingName={onboardingName}
                user={user}
                streakCount={streakCount}
                moodLogsCount={moodLogs.length}
                memoriesCount={memories.length}
              />
            )}

            {/* TAB 5: UPGRADE TAB */}
            {activeTab === 'upgrade' && (
              <UpgradeView
                isPremium={isPremium}
                credits={credits}
                onUpgradeToPremium={handleUpgradeToPremium}
                onCancelSubscription={handleCancelSubscription}
                onBuyCredits={handleBuyCredits}
              />
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* MODAL WINDOWS */}
      <CheckInModal
        showCheckInModal={showCheckInModal}
        lastCheckInTime={lastCheckInTime}
        nextCheckInText={getNextCheckInStatus().text}
        checkInMood={checkInMood}
        setCheckInMood={setCheckInMood}
        checkInEmoji={checkInEmoji}
        setCheckInEmoji={setCheckInEmoji}
        checkInNote={checkInNote}
        setCheckInNote={setCheckInNote}
        onSaveCheckIn={handleSaveCheckIn}
        onSkipCheckIn={handleSkipCheckIn}
        TWENTY_FOUR_HOURS_MS={TWENTY_FOUR_HOURS_MS}
      />

      <CreditsModal
        showCreditsModal={showCreditsModal}
        setShowCreditsModal={setShowCreditsModal}
        onBuyCredits={handleBuyCredits}
      />

    </div>
  );
}
