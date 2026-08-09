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

export async function fetchRecentUserSessions(limit = 10): Promise<UserSessionRecord[]> {
  try {
    const { data, error } = await supabase
      .from('user_sessions')
      .select('*')
      .order('event_time', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Unable to fetch user session activity:', error.message);
      return [];
    }

    return (data || []) as UserSessionRecord[];
  } catch (error) {
    console.warn('Unable to fetch user session activity:', error);
    return [];
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

