import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, LogOut, Users, Settings2, Gauge, Clock3 } from 'lucide-react';
import { fetchRecentUserSessions, type UserSessionRecord } from '../lib/supabase';

interface AdminPageProps {
  user: {
    name: string;
    email: string;
    role?: 'admin' | 'user';
  };
  onLogout: () => void;
}

export default function AdminPage({ user, onLogout }: AdminPageProps) {
  const [sessions, setSessions] = useState<UserSessionRecord[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSessions = async () => {
      setSessionsLoading(true);
      try {
        const recentSessions = await fetchRecentUserSessions(8);
        if (isMounted) {
          setSessions(recentSessions);
        }
      } catch {
        if (isMounted) {
          setSessions([]);
        }
      } finally {
        if (isMounted) {
          setSessionsLoading(false);
        }
      }
    };

    loadSessions();

    return () => {
      isMounted = false;
    };
  }, []);

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#04050A] text-white selection:bg-[#00ffff] selection:text-black flex items-center justify-center p-6">
        <div className="max-w-2xl w-full rounded-[2rem] border border-white/10 bg-[#071017]/90 p-8 text-center shadow-[0_0_60px_rgba(0,255,255,0.12)]">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#00ffff] font-mono mb-4">Access Restricted</p>
          <h1 className="text-3xl font-serif font-bold text-white mb-4">Admin Access Required</h1>
          <p className="text-sm text-gray-300 mb-6">
            The admin panel is reserved for authorized administrator accounts. Please sign in with admin credentials through the login page.
          </p>
          <button
            onClick={onLogout}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[#00ffff]/10 px-6 py-3 text-sm font-semibold text-[#00ffff] transition hover:bg-[#00ffff]/20"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04050A] text-white selection:bg-[#00ffff] selection:text-black">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#00ffff] font-mono mb-3">Admin Control Panel</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-white">Welcome back, {user.name}</h1>
            <p className="mt-3 max-w-2xl text-sm text-gray-400 font-light leading-relaxed">
              This admin panel is only accessible through authorized admin login. Use it to monitor subscription activity, manage users, and review application status.
            </p>
          </div>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[#00ffff]/30 hover:bg-[#00ffff]/10"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#09101F]/80 p-8 shadow-[0_0_50px_rgba(0,255,255,0.08)]">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.35em] font-mono text-[#00ffff]">Admin Insights</span>
                  <h2 className="mt-4 text-2xl font-serif font-bold text-white">Live System Overview</h2>
                </div>
                <div className="rounded-3xl bg-[#00ffff]/10 px-4 py-2 text-[#00ffff] text-xs font-semibold uppercase tracking-[0.2em]">
                  ADMIN MODE
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Gauge size={18} className="text-[#00ffff]" />, label: 'Server Health', value: 'Stable' },
                  { icon: <ShieldCheck size={18} className="text-[#00ffff]" />, label: 'Active Admin Sessions', value: '1' },
                  { icon: <Users size={18} className="text-[#00ffff]" />, label: 'Total Users', value: '1,234' },
                  { icon: <Settings2 size={18} className="text-[#00ffff]" />, label: 'Pending Updates', value: '0' }
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-3 text-gray-300">
                      {item.icon}
                      <span className="text-[10px] uppercase tracking-[0.35em] text-[#00ffff] font-mono font-semibold">{item.label}</span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#09101F]/80 p-8 shadow-[0_0_50px_rgba(0,255,255,0.08)]">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-xl font-serif font-bold text-white">Recent login activity</h2>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#00ffff]">
                  Supabase
                </div>
              </div>

              {sessionsLoading ? (
                <p className="text-sm text-gray-400">Loading activity records...</p>
              ) : sessions.length === 0 ? (
                <p className="text-sm text-gray-400">No activity has been logged yet. User logins and logouts will appear here.</p>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div key={session.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">{session.user_name || session.user_email}</p>
                          <p className="mt-1 text-xs text-gray-400">{session.user_email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.auth_provider && (
                            <div className="rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]">
                              {session.auth_provider}
                            </div>
                          )}
                          <div className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] ${session.event_type === 'login' ? 'bg-[#00ffff]/10 text-[#00ffff]' : 'bg-white/10 text-gray-300'}`}>
                            {session.event_type}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-300">
                        <Clock3 size={14} className="text-[#00ffff]" />
                        <span>{new Date(session.event_time).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#09101F]/80 p-8 shadow-[0_0_50px_rgba(0,255,255,0.08)]">
              <h2 className="text-xl font-serif font-bold text-white mb-4">Admin Actions</h2>
              <div className="space-y-4">
                <button className="w-full rounded-2xl border border-white/10 bg-[#00ffff]/10 px-5 py-4 text-left text-white transition hover:border-[#00ffff]/30 hover:bg-[#00ffff]/15">
                  <span className="text-sm font-semibold">View user subscription reports</span>
                  <p className="mt-2 text-xs text-gray-400">Browse active members, VIP status, and ongoing credit usage.</p>
                </button>
                <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-white transition hover:border-[#00ffff]/30 hover:bg-[#00ffff]/10">
                  <span className="text-sm font-semibold">Manage app settings</span>
                  <p className="mt-2 text-xs text-gray-400">Update environment settings, review logs, and tune feature rollout.</p>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#09101F]/80 p-8 shadow-[0_0_50px_rgba(0,255,255,0.08)]">
              <h2 className="text-xl font-serif font-bold text-white mb-4">Admin Notes</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Only users logged in with admin credentials can access this panel. If you want additional controls, we can extend it to include user management, access logs, and plan approval workflows.
              </p>
              <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-4 text-sm text-gray-300">
                <p><span className="font-semibold text-white">Admin email:</span> admin@sarvi.ai</p>
                <p className="mt-1"><span className="font-semibold text-white">Password:</span> Admin@123</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#09101F]/80 p-8 shadow-[0_0_50px_rgba(0,255,255,0.08)]">
              <h2 className="text-xl font-serif font-bold text-white mb-4">Quick admin guidance</h2>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2"><span className="text-[#00ffff]">•</span> Use the same login form; admin access is granted only with admin credentials.</li>
                <li className="flex gap-2"><span className="text-[#00ffff]">•</span> Regular users will continue to land on the standard dashboard.</li>
                <li className="flex gap-2"><span className="text-[#00ffff]">•</span> Admin panel is only visible after a successful admin login.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
