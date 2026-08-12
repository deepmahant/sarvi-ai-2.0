import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const candidateFrontendRoots = [
  path.resolve(process.cwd(), 'frontend'),
  path.resolve(__dirname, '../frontend'),
  path.resolve(__dirname, '../../frontend'),
];
const frontendRoot = candidateFrontendRoots.find((candidate) => fs.existsSync(candidate)) ?? path.resolve(process.cwd(), 'frontend');

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT ?? 3000);
  const HOST = process.env.HOST ?? '0.0.0.0';

  // Enable CORS & Security Headers
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // Body parser
  app.use(express.json());

  // Compassionate AI Chat Proxy Route
  app.post('/api/chat', async (req, res) => {
    const { message, userName } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const name = userName || 'friend';

    // Helper for fast, dynamic contextual fallback responses
    const generateSmartFallback = (input: string) => {
      const lower = input.toLowerCase();
      if (lower.includes('stress') || lower.includes('overwhelm') || lower.includes('work') || lower.includes('busy')) {
        return `I hear the weight you are carrying right now, ${name}. Overwhelm often makes everything feel urgent at once. Take a slow, soft breath with me. Let's break things down together—what feels like the single most pressing thing on your mind?`;
      }
      if (lower.includes('anx') || lower.includes('scared') || lower.includes('fear') || lower.includes('panic')) {
        return `Anxiety can feel so intense in the body, ${name}. Please remember you are safe in this space, and your feelings are completely valid. You don't have to figure it all out this minute. How are your shoulders and breath feeling right now?`;
      }
      if (lower.includes('sad') || lower.includes('lonely') || lower.includes('hurt') || lower.includes('cry') || lower.includes('pain')) {
        return `I am holding a gentle, compassionate space for your sadness, ${name}. You don't have to be strong or pretend everything is okay here. What would feel most comforting for you right now?`;
      }
      if (lower.includes('happy') || lower.includes('good') || lower.includes('great') || lower.includes('proud') || lower.includes('excited') || lower.includes('smile')) {
        return `It brings me so much warmth to hear that, ${name}! Celebrating these moments of joy and peace is a beautiful part of your growth. What was the best highlight of that experience?`;
      }
      if (lower.includes('reframe') || lower.includes('negative') || lower.includes('thought')) {
        return `Reframing is a powerful step, ${name}. When a negative thought arises, try asking: 'Is this 100% true, or is my mind just trying to protect me?' What specific thought would you like us to reframe together?`;
      }
      if (lower.includes('evening') || lower.includes('reflect') || lower.includes('today')) {
        return `Evening reflections are a gentle way to close your day, ${name}. Even on challenging days, small quiet moments matter. What is one small thing from today that gave you a sense of calm or gratitude?`;
      }
      return `Thank you for trusting me with your thoughts, ${name}. I am listening closely with absolute warmth and zero judgment. How does it feel to share that out loud today?`;
    };

    if (!apiKey) {
      return res.status(200).json({
        reply: generateSmartFallback(message)
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are Sarvi AI, a gentle, warm, and highly empathetic mental wellness companion.
User: "${name}". 
Acknowledge their thoughts with deep warmth, validate their emotions, and use supportive active listening techniques.
Avoid psychiatric diagnoses. Speak in a comforting, human, modern voice.
Keep response concise (2-4 sentences or 1-2 small paragraphs), ending with a soft supportive open-ended inquiry.

User's message: "${message}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const reply = response.text?.trim() || generateSmartFallback(message);
      return res.json({ reply });
    } catch (err: any) {
      console.error('Gemini API Error:', err?.message || err);
      return res.status(200).json({
        reply: generateSmartFallback(message)
      });
    }
  });

  // Server & API Health Check Endpoint for Render Monitoring
  app.get(['/health', '/api/health'], (_req, res) => {
    res.json({
      status: 'ok',
      service: 'SARVI AI 2.0',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    });
  });

  // Handle client-side routing and Vite dev server middlewares
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      root: frontendRoot,
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const candidateDistPaths = [
      path.join(frontendRoot, 'dist'),
      path.resolve(process.cwd(), 'frontend', 'dist'),
      path.resolve(process.cwd(), 'dist'),
      path.resolve(__dirname, '../frontend/dist'),
      path.resolve(__dirname, '../../frontend/dist'),
    ];

    const distPath = candidateDistPaths.find((p) => fs.existsSync(p)) ?? path.join(frontendRoot, 'dist');

    // Fast caching headers for JS/CSS assets
    app.use(
      express.static(distPath, {
        maxAge: '7d',
        etag: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, must-revalidate');
          } else {
            res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
          }
        },
      })
    );

    // SPA wildcard fallback for all routes (/admin, /chat, /login, /auth)
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        return next();
      }
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Application bundle build in progress or dist directory not found.');
      }
    });
  }

  const server = app.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT} (Environment: ${process.env.NODE_ENV || 'development'})`);
  });

  // Keep-alive self ping interval to prevent Render free-tier instance cold sleep
  if (process.env.NODE_ENV === 'production') {
    const selfPingInterval = setInterval(() => {
      const pingUrl = `http://127.0.0.1:${PORT}/health`;
      fetch(pingUrl).catch(() => {});
    }, 4 * 60 * 1000); // Ping every 4 minutes

    process.on('SIGTERM', () => {
      clearInterval(selfPingInterval);
      server.close();
    });
  }
}

startServer();
