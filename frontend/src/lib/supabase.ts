import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://othgyqwvfaxttqzjtmdb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_rGRymMtdj9Rr3REPgfNNrg_zoOBEEGV';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export interface UserSessionRecord {
  id: string;
  user_email: string;
  user_name?: string | null;
  event_type: 'login' | 'logout';
  event_time: string;
  created_at?: string;
  auth_provider?: string | null;
  avatar_url?: string | null;
}

export interface TrackUserSessionOptions {
  userEmail?: string | null;
  userName?: string | null;
  eventType: 'login' | 'logout';
  authProvider?: string | null;
  avatarUrl?: string | null;
}

export async function trackUserSessionEvent({
  userEmail,
  userName,
  eventType,
  authProvider = 'facebook',
  avatarUrl,
}: TrackUserSessionOptions) {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedEmail = userEmail?.trim().toLowerCase();
  if (!normalizedEmail) {
    return;
  }

  const timestamp = new Date().toISOString();
  const fullPayload: Record<string, any> = {
    user_email: normalizedEmail,
    user_name: userName?.trim() || null,
    event_type: eventType,
    event_time: timestamp,
    auth_provider: authProvider || 'email',
  };

  if (avatarUrl) {
    fullPayload.avatar_url = avatarUrl;
  }

  // Save local fallback session log for instant real-time UI updates
  try {
    const localSessionsStr = localStorage.getItem('sarvi_local_user_sessions');
    const localSessions: UserSessionRecord[] = localSessionsStr ? JSON.parse(localSessionsStr) : [];
    const newRecord: UserSessionRecord = {
      id: `SES-${Math.floor(10000 + Math.random() * 90000)}`,
      user_email: normalizedEmail,
      user_name: userName?.trim() || null,
      event_type: eventType,
      event_time: timestamp,
      auth_provider: authProvider || 'email',
      avatar_url: avatarUrl || null,
    };
    const updated = [newRecord, ...localSessions].slice(0, 50);
    localStorage.setItem('sarvi_local_user_sessions', JSON.stringify(updated));
  } catch {}

  try {
    // Primary attempt: Save to user_sessions table in Supabase DB
    const { error } = await supabase.from('user_sessions').insert(fullPayload);

    if (error) {
      // Fallback: If auth_provider or avatar_url columns do not exist in the table yet, insert standard fields
      const { error: fallbackError } = await supabase.from('user_sessions').insert({
        user_email: normalizedEmail,
        user_name: userName?.trim() || null,
        event_type: eventType,
        event_time: timestamp,
      });

      if (fallbackError) {
        console.warn('Unable to log user session activity:', fallbackError.message);
      }
    }
  } catch (error) {
    console.warn('Unable to log user session activity:', error);
  }

  // Also sync user profile into profiles table if available
  if (eventType === 'login') {
    await saveUserProfileInDatabase({
      email: normalizedEmail,
      name: userName,
      avatarUrl,
      provider: authProvider || 'facebook',
    }).catch(() => {});
  }
}

export async function saveUserProfileInDatabase({
  id,
  email,
  name,
  avatarUrl,
  provider = 'facebook',
}: {
  id?: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  provider?: string;
}) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return;

  try {
    const payload: Record<string, any> = {
      email: normalizedEmail,
      full_name: name?.trim() || null,
      avatar_url: avatarUrl || null,
      provider: provider || 'facebook',
      last_sign_in_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (id) {
      payload.id = id;
    }

    const { error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'email' });

    if (error) {
      // Ignore if profiles table is not created yet
    }
  } catch {
    // Non-blocking database sync catch
  }
}

export async function signInWithFacebook() {
  const redirectTo = getSupabaseRedirectUrl('/chat');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo,
      scopes: 'public_profile',
    },
  });

  if (error) {
    throw error;
  }

  if (data?.url) {
    window.location.assign(data.url);
  }

  return data;
}

export async function fetchRecentUserSessions(limit = 30): Promise<UserSessionRecord[]> {
  let dbSessions: UserSessionRecord[] = [];
  try {
    const { data, error } = await supabase
      .from('user_sessions')
      .select('*')
      .order('event_time', { ascending: false })
      .limit(limit);

    if (!error && data) {
      dbSessions = data as UserSessionRecord[];
    }
  } catch (error) {
    console.warn('Unable to fetch user session activity:', error);
  }

  let localSessions: UserSessionRecord[] = [];
  try {
    const localSessionsStr = typeof window !== 'undefined' ? localStorage.getItem('sarvi_local_user_sessions') : null;
    if (localSessionsStr) {
      localSessions = JSON.parse(localSessionsStr);
    }
  } catch {}

  // Merge DB and local sessions, deduplicating by email & timestamp
  const mergedMap = new Map<string, UserSessionRecord>();
  [...localSessions, ...dbSessions].forEach((s) => {
    const key = `${s.user_email}-${s.event_type}-${s.event_time.slice(0, 16)}`;
    if (!mergedMap.has(key)) {
      mergedMap.set(key, s);
    }
  });

  const mergedList = Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
  );

  return mergedList.slice(0, limit);
}

export interface WebsiteIssue {
  id: string;
  title: string;
  category: 'API Error' | 'UI Bug' | 'Database' | 'Auth Failure' | 'Performance';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'resolved';
  timestamp: string;
  details: string;
  location: string;
}

export interface RevenueTransaction {
  id: string;
  userEmail: string;
  userName: string;
  plan: 'Pro Tier' | 'VIP Tier' | 'Credits Pack';
  amountINR: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: 'UPI' | 'Card' | 'NetBanking';
}

export interface SystemHealthMetrics {
  serverStatus: 'Optimal' | 'Degraded' | 'Down';
  apiLatencyMs: number;
  dbStatus: 'Connected' | 'Disconnected';
  activeSessionsCount: number;
  openIssuesCount: number;
  totalRevenueINR: number;
  totalUsersCount: number;
  todayNewUsers: number;
}

export async function fetchWebsiteIssues(): Promise<WebsiteIssue[]> {
  try {
    const { data, error } = await supabase
      .from('website_issues')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as WebsiteIssue[];
  } catch {
    return [];
  }
}

export async function fetchRevenueTransactions(): Promise<RevenueTransaction[]> {
  try {
    const { data, error } = await supabase
      .from('revenue_transactions')
      .select('*')
      .order('date', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as RevenueTransaction[];
  } catch {
    return [];
  }
}

export async function recordRevenueTransaction(transaction: Omit<RevenueTransaction, 'id' | 'date'>) {
  try {
    const payload = {
      ...transaction,
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
    };
    const { error } = await supabase.from('revenue_transactions').insert(payload);
    if (error) {
      console.warn('Unable to record transaction in database:', error.message);
    }
  } catch (err) {
    console.warn('Transaction record error:', err);
  }
}

export function getSupabaseRedirectUrl(path = '/chat') {
  const configuredRedirect = import.meta.env.VITE_SUPABASE_REDIRECT_URL?.trim();
  if (configuredRedirect) {
    return configuredRedirect;
  }

  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`;
  }

  return `http://127.0.0.1:3000${path}`;
}


