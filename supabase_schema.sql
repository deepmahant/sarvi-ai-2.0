-- ====================================================================
-- SARVI AI 2.0 - Complete Supabase Database Schema & Setup Script
-- Paste and execute this entire file in your Supabase Dashboard -> SQL Editor
-- ====================================================================

-- 1. Create user_sessions table (for tracking user logins & activity)
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_name TEXT,
  auth_provider TEXT DEFAULT 'email',
  event_type TEXT NOT NULL,
  avatar_url TEXT,
  event_time TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create profiles table (for storing user profile metadata)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  provider TEXT DEFAULT 'email',
  last_sign_in_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create website_issues table (for admin bug & system telemetry tracking)
CREATE TABLE IF NOT EXISTS public.website_issues (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'UI Bug',
  severity TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'open',
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  details TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'frontend/src/App.tsx'
);

-- 4. Create revenue_transactions table (for financial analytics tracking)
CREATE TABLE IF NOT EXISTS public.revenue_transactions (
  id TEXT PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_name TEXT,
  plan TEXT NOT NULL,
  amount_inr NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT DEFAULT 'UPI',
  status TEXT NOT NULL DEFAULT 'completed',
  date TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_transactions ENABLE ROW LEVEL SECURITY;

-- 6. Create Public RLS Policies for user_sessions
DROP POLICY IF EXISTS "Allow public insert to user_sessions" ON public.user_sessions;
CREATE POLICY "Allow public insert to user_sessions" ON public.user_sessions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read of user_sessions" ON public.user_sessions;
CREATE POLICY "Allow public read of user_sessions" ON public.user_sessions FOR SELECT USING (true);

-- 7. Create Public RLS Policies for profiles
DROP POLICY IF EXISTS "Allow public insert/upsert profiles" ON public.profiles;
CREATE POLICY "Allow public insert/upsert profiles" ON public.profiles FOR ALL USING (true);

-- 8. Create Public RLS Policies for website_issues
DROP POLICY IF EXISTS "Allow public website_issues access" ON public.website_issues;
CREATE POLICY "Allow public website_issues access" ON public.website_issues FOR ALL USING (true);

-- 9. Create Public RLS Policies for revenue_transactions
DROP POLICY IF EXISTS "Allow public revenue_transactions access" ON public.revenue_transactions;
CREATE POLICY "Allow public revenue_transactions access" ON public.revenue_transactions FOR ALL USING (true);

-- 10. Seed default website_issues if empty
INSERT INTO public.website_issues (id, title, category, severity, status, timestamp, details, location)
VALUES
  ('ERR-101', 'Supabase Database Table Sync', 'Database', 'medium', 'resolved', NOW(), 'Initial database table verification and schema migration setup.', 'backend/server.ts'),
  ('ERR-102', 'Facebook OAuth Domain Validation', 'Auth Failure', 'low', 'resolved', NOW(), 'OAuth callback domain matching configuration.', 'frontend/src/lib/supabase.ts')
ON CONFLICT (id) DO NOTHING;
