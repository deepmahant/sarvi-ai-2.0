import { createClient } from '@supabase/supabase-js';

// Support both Vite (import.meta.env) and Node.js (process.env) environments
const getEnv = (viteKey: string, nodeKey: string, fallback: string): string => {
  try {
    // @ts-ignore - import.meta.env is Vite-specific
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[viteKey]) {
      return import.meta.env[viteKey].trim();
    }
  } catch {}
  if (typeof process !== 'undefined' && process.env && process.env[nodeKey]) {
    return process.env[nodeKey]!.trim();
  }
  return fallback;
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL', 'VITE_SUPABASE_URL', 'https://othgyqwvfaxttqzjtmdb.supabase.co');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY', 'sb_publishable_rGRymMtdj9Rr3REPgfNNrg_zoOBEEGV');

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

export interface DatabaseHealthReport {
  connected: boolean;
  authConnected: boolean;
  dbConnected: boolean;
  existingTables: string[];
  missingTables: string[];
  message: string;
  latencyMs: number;
}

/**
 * Perform a live real-time connection check against Supabase Auth & Database tables.
 */
export async function checkDatabaseConnection(): Promise<DatabaseHealthReport> {
  const startTime = performance.now();
  let authConnected = false;
  let dbConnected = false;
  const existingTables: string[] = [];
  const missingTables: string[] = [];

  // 1. Check Auth service connectivity
  try {
    const { error: sessionError } = await supabase.auth.getSession();
    if (!sessionError) {
      authConnected = true;
    }
  } catch {}

  // 2. Check Database Tables connectivity
  const tablesToCheck = ['users', 'weekly_reflections', 'session_titles', 'credit_transactions', 'subscriptions', 'user_sessions', 'profiles', 'website_issues', 'revenue_transactions'];
  
  await Promise.all(
    tablesToCheck.map(async (table) => {
      try {
        const { error } = await supabase.from(table).select('*').limit(1);
        if (!error) {
          existingTables.push(table);
          dbConnected = true;
        } else if (error.code === 'PGRST205') {
          missingTables.push(table);
        } else {
          // Table exists but RLS or empty query error
          existingTables.push(table);
          dbConnected = true;
        }
      } catch {
        missingTables.push(table);
      }
    })
  );

  const endTime = performance.now();
  const latencyMs = Math.round(endTime - startTime);

  let message = 'Database & Auth operating normally.';
  if (!authConnected) {
    message = 'Unable to reach Supabase Auth endpoint.';
  } else if (missingTables.length > 0) {
    message = `Database connected. ${missingTables.length} tables pending migration (${missingTables.join(', ')}). Run supabase_schema.sql to create them.`;
  }

  return {
    connected: authConnected && dbConnected,
    authConnected,
    dbConnected,
    existingTables,
    missingTables,
    message,
    latencyMs,
  };
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

    if (error && error.code === 'PGRST205') {
      // Fallback: If user_sessions table not created yet, log to users table if present
      await supabase.from('users').upsert({
        email: normalizedEmail,
        name: userName?.trim() || null,
        updated_at: timestamp,
      }).catch(() => {});
    }
  } catch (error) {
    console.warn('User session log attempt handled:', error);
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

    if (error && error.code === 'PGRST205') {
      // Fallback to existing users table if profiles table is not created yet
      await supabase.from('users').upsert({
        email: normalizedEmail,
        name: name?.trim() || null,
        updated_at: new Date().toISOString(),
      }).catch(() => {});
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
  let dbIssues: WebsiteIssue[] = [];
  try {
    const { data, error } = await supabase
      .from('website_issues')
      .select('*')
      .order('timestamp', { ascending: false });

    if (!error && data) {
      dbIssues = data as WebsiteIssue[];
    }
  } catch {}

  let localIssues: WebsiteIssue[] = [];
  try {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('sarvi_website_issues') : null;
    if (stored) {
      localIssues = JSON.parse(stored);
    }
  } catch {}

  if (dbIssues.length > 0) return dbIssues;
  return localIssues;
}

export async function saveWebsiteIssue(issue: WebsiteIssue): Promise<void> {
  try {
    const stored = localStorage.getItem('sarvi_website_issues');
    const list: WebsiteIssue[] = stored ? JSON.parse(stored) : [];
    const updated = [issue, ...list];
    localStorage.setItem('sarvi_website_issues', JSON.stringify(updated));
  } catch {}

  try {
    await supabase.from('website_issues').insert(issue);
  } catch {}
}

export async function fetchRevenueTransactions(): Promise<RevenueTransaction[]> {
  let dbTxns: RevenueTransaction[] = [];
  try {
    const { data, error } = await supabase
      .from('revenue_transactions')
      .select('*')
      .order('date', { ascending: false });

    if (!error && data) {
      dbTxns = data as RevenueTransaction[];
    }
  } catch {}

  let localTxns: RevenueTransaction[] = [];
  try {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('sarvi_revenue_txns') : null;
    if (stored) {
      localTxns = JSON.parse(stored);
    }
  } catch {}

  if (dbTxns.length > 0) return dbTxns;
  return localTxns;
}

export async function recordRevenueTransaction(transaction: Omit<RevenueTransaction, 'id' | 'date'>) {
  const payload = {
    ...transaction,
    id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString(),
  };

  try {
    const stored = localStorage.getItem('sarvi_revenue_txns');
    const list: RevenueTransaction[] = stored ? JSON.parse(stored) : [];
    const updated = [payload, ...list];
    localStorage.setItem('sarvi_revenue_txns', JSON.stringify(updated));
  } catch {}

  try {
    const { error } = await supabase.from('revenue_transactions').insert(payload);
    if (error && error.code === 'PGRST205') {
      // Fallback insert to credit_transactions table if revenue_transactions table missing
      await supabase.from('credit_transactions').insert({
        user_id: payload.userEmail,
        amount: payload.amountINR,
        description: payload.plan,
        created_at: payload.date,
      }).catch(() => {});
    }
  } catch (err) {
    console.warn('Transaction record attempt handled:', err);
  }
}

export function getSupabaseRedirectUrl(path = '/chat') {
  if (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost') && !window.location.origin.includes('127.0.0.1')) {
    return `${window.location.origin}${path}`;
  }

  const configuredRedirect = getEnv('VITE_SUPABASE_REDIRECT_URL', 'VITE_SUPABASE_REDIRECT_URL', '');
  // If no redirect URL configured, skip this block
  if (configuredRedirect && (configuredRedirect.startsWith('http://') || configuredRedirect.startsWith('https://'))) {
    return configuredRedirect;
  }

  if (typeof window !== 'undefined' && window.location.origin) {
    return `${window.location.origin}${path}`;
  }

  return `http://127.0.0.1:3000${path}`;
}
