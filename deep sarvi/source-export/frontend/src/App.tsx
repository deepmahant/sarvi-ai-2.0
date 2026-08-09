import { useState, useEffect, lazy, Suspense } from 'react';
import NoiseOverlay from './components/NoiseOverlay';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ChatDashboardPage = lazy(() => import('./pages/ChatDashboardPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

type ViewState = 'landing' | 'auth' | 'dashboard' | 'admin';

type AppUser = {
  name: string;
  email: string;
  role?: 'admin' | 'user';
};

function getInitialViewState(): { view: ViewState; user: AppUser | null } {
  if (typeof window === 'undefined') {
    return { view: 'landing', user: null };
  }

  const savedUser = localStorage.getItem('sarvi_current_user');
  const user = savedUser ? JSON.parse(savedUser) : null;
  const path = window.location.pathname;

  if (path === '/admin') {
    if (user?.role === 'admin') return { view: 'admin', user };
    if (user) return { view: 'dashboard', user };
    return { view: 'auth', user: null };
  }
  if (path === '/chat' || path === '/dashboard') {
    if (user) return { view: 'dashboard', user };
    return { view: 'auth', user: null };
  }
  if (path === '/login' || path === '/auth') {
    if (user?.role === 'admin') return { view: 'admin', user };
    if (user) return { view: 'dashboard', user };
    return { view: 'auth', user: null };
  }
  return { view: 'landing', user };
}

export default function App() {
  const [userState, setUserState] = useState(getInitialViewState);
  const [showIntro, setShowIntro] = useState(true);
  const [introText, setIntroText] = useState('');
  const [isIntroReady, setIsIntroReady] = useState(false);
  const { view, user: currentUser } = userState;

  const handleSubmitIntro = () => {
    if (!showIntro) return;
    setShowIntro(false);
  };

  useEffect(() => {
    if (!showIntro) return;

    const fullText = 'ARE YOU READY TO JOIN SARVI AI? WELCOME TO SARVI AI. PRESS ENTER TO CONTINUE.';
    let currentIndex = 0;

    const typeInterval = window.setInterval(() => {
      currentIndex += 1;
      setIntroText(fullText.slice(0, currentIndex));

      if (currentIndex >= fullText.length) {
        window.clearInterval(typeInterval);
        window.setTimeout(() => setIsIntroReady(true), 250);
      }
    }, 35);

    return () => window.clearInterval(typeInterval);
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmitIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro || !isIntroReady) return;

    const autoAdvance = window.setTimeout(() => {
      handleSubmitIntro();
    }, 4500);

    return () => window.clearTimeout(autoAdvance);
  }, [showIntro, isIntroReady]);

  useEffect(() => {
    const handlePopState = () => {
      setUserState(getInitialViewState());
    };
    window.addEventListener('popstate', handlePopState, { passive: true });
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newView: ViewState, targetPath: string) => {
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setUserState(prev => ({ ...prev, view: newView }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = () => {
    navigate('auth', '/login');
  };

  const handleOpenAdmin = () => {
    navigate('auth', '/admin');
  };

  const handleAuthSuccess = (user: AppUser) => {
    localStorage.setItem('sarvi_current_user', JSON.stringify(user));
    if (user.role === 'admin') {
      setUserState({ view: 'admin', user });
      if (window.location.pathname !== '/admin') {
        window.history.pushState({}, '', '/admin');
      }
    } else {
      setUserState({ view: 'dashboard', user });
      if (window.location.pathname !== '/chat') {
        window.history.pushState({}, '', '/chat');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('sarvi_current_user');
    setUserState({ view: 'landing', user: null });
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    navigate('landing', '/');
  };

  return (
    <div
      id="app-root-viewport"
      className="min-h-screen bg-[#050505] selection:bg-[#00ffff] selection:text-black font-sans text-white relative"
    >
      <div
        className={`fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#030408] transition-opacity duration-700 ${showIntro ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.04)_50%,transparent_100%)] intro-shimmer" />

        <div className="relative w-full max-w-2xl px-6 text-center">
          <div className="mx-auto mb-6 flex max-w-sm items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <span className="mr-2 h-2.5 w-2.5 rounded-full bg-[#00ffff] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#00ffff]">SARVI AI COMMUNITY BOOT</span>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#051018]/90 p-6 shadow-[0_0_80px_rgba(0,255,255,0.16)] backdrop-blur-xl sm:p-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#00ffff] intro-kicker">Presence • Calm • Care</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-krona tracking-[0.2em] text-white intro-title">SARVI AI</h1>
            <p className="mt-3 text-2xl sm:text-3xl font-serif text-[#eaf7ff] intro-subtitle">Never Alone</p>

            <div className="mt-6 rounded-[1.25rem] border border-[#00ffff]/20 bg-black/30 p-4 text-left shadow-inner">
              <div className="mb-2 text-[10px] uppercase tracking-[0.35em] text-gray-500">Keyboard Console</div>
              <p className="min-h-16 font-mono text-sm leading-7 text-[#eaf7ff] sm:text-base">
                {introText}
                {isIntroReady && <span className="intro-cursor">|</span>}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-gray-400">
                Press Enter
              </div>
              <button
                onClick={handleSubmitIntro}
                className="intro-button rounded-full border border-[#00ffff]/30 bg-[#00ffff]/10 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#00ffff] transition-all duration-300 hover:bg-[#00ffff]/20"
              >
                Submit
              </button>
            </div>

            <div className="intro-keyboard mt-6 flex flex-wrap justify-center gap-2">
              {['A', 'R', 'E', 'Y', 'O', 'U', 'R', 'E', 'A', 'D', 'Y'].map((key, index) => (
                <div
                  key={`${key}-${index}`}
                  className="intro-keyboard-key intro-keyboard-key-active"
                >
                  {key}
                </div>
              ))}
              <div className="intro-keyboard-key intro-keyboard-key-enter">ENTER</div>
            </div>
          </div>
        </div>
      </div>

      {/* 100% Offline Reliable Grain Noise Overlay */}
      <NoiseOverlay />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#030408]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#00ffff] border-t-transparent animate-spin" />
              <span className="text-xs font-mono text-[#00ffff] tracking-widest uppercase">Sarvi AI</span>
            </div>
          </div>
        }
      >
        {view === 'landing' && (
          <LandingPage onOpenAuth={handleOpenAuth} onOpenAdmin={handleOpenAdmin} />
        )}

        {view === 'auth' && (
          <AuthPage 
            onSuccess={handleAuthSuccess} 
            onBackToHome={handleBackToHome} 
          />
        )}

        {view === 'dashboard' && currentUser && (
          <ChatDashboardPage 
            user={currentUser} 
            onLogout={handleLogout} 
          />
        )}

        {view === 'admin' && currentUser && (
          <AdminPage 
            user={currentUser} 
            onLogout={handleLogout} 
          />
        )}
      </Suspense>
    </div>
  );
}

