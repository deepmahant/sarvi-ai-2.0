export type OrbState = 'calm' | 'happy' | 'excited' | 'sad' | 'encouraging' | 'hopeful' | 'thinking' | 'listening';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface MoodLog {
  id?: string;
  mood: string;
  emoji: string;
  color: string;
  time: string;
  timestamp?: number;
  notes?: string;
}

export interface Memory {
  id: string;
  text: string;
  category: string;
  timestamp: string;
}

export interface Session {
  id: string;
  title: string;
  messages: Message[];
  date: string;
  sentiment: string;
}

export interface UserProfile {
  name: string;
  email: string;
}
