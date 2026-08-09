# SARVI AI 2.0 - Mental Wellness AI & Facebook Auth Database Integration

SARVI AI 2.0 is an AI-powered mental wellness companion built with React, Vite, Tailwind CSS, Node.js Express backend, and Supabase database authentication (including Facebook & Google OAuth).

---

## 📁 Project Structure (Section-wise Division)

```
SARVI AI 2.0/
├── backend/                  # Backend Node.js Express Server
│   └── server.ts             # Express Server, Gemini AI proxy & static file handler
├── frontend/                 # Frontend React App (Vite + TypeScript)
│   ├── src/
│   │   ├── components/       # UI Components (LoginForm, NoiseOverlay, ContactSection, etc.)
│   │   ├── lib/              # Supabase Client & Facebook DB Tracking (supabase.ts)
│   │   ├── pages/            # Page Views (LandingPage, AuthPage, ChatDashboardPage, AdminPage)
│   │   ├── types/            # TypeScript Type definitions
│   │   ├── App.tsx           # Main Application Router & Auth Session Sync
│   │   ├── index.css         # Styling System & Glassmorphism Theme
│   │   ├── main.tsx          # Application Entry Point
│   │   └── vite-env.d.ts     # Vite Environment Types
│   ├── index.html            # HTML Template
│   ├── tsconfig.json         # Frontend TypeScript Config
│   └── vite.config.ts        # Vite Build Config
├── .env                      # Environment Variables (Supabase & API keys)
├── .env.example              # Sample Environment Template
├── package.json              # Main package dependencies and scripts
└── README.md                 # Project documentation
```

---

## 💾 Database Schema (Supabase SQL Setup)

Run the following SQL queries in your **Supabase Dashboard -> SQL Editor**:

```sql
-- 1. Create user_sessions table
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_name TEXT,
  auth_provider TEXT DEFAULT 'facebook',
  event_type TEXT NOT NULL,
  event_time TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  provider TEXT DEFAULT 'facebook',
  last_sign_in_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS and Policies
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert to user_sessions" ON public.user_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read of user_sessions" ON public.user_sessions FOR SELECT USING (true);
```

---

## 🔑 Facebook OAuth Configuration

1. **Meta Developers Console**:
   - Go to [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)
   - Create App -> Select **Facebook Login**.
   - Under **App Settings -> Basic**:
     - **App Domains**: `othgyqwvfaxttqzjtmdb.supabase.co`
     - **Site URL**: `https://othgyqwvfaxttqzjtmdb.supabase.co`
   - Under **Facebook Login -> Settings**:
     - **Valid OAuth Redirect URIs**: `https://othgyqwvfaxttqzjtmdb.supabase.co/auth/v1/callback`

2. **Supabase Dashboard**:
   - Go to **Authentication -> Providers -> Facebook**.
   - Turn ON **Enable Facebook provider**.
   - Paste **Facebook Client ID** and **Facebook Client Secret**.

---

## 🚀 How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access App**:
   - Frontend & Server: `http://localhost:3000`
   - Login Page: `http://localhost:3000/login`
   - Admin Control Panel: `http://localhost:3000/admin` (Email: `admin@sarvi.ai` / Password: `Admin@123`)
