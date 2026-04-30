import { createClient } from '@supabase/supabase-js'

// שיטה חסינת תקלות למציאת המשתנים ב-Vite
const env = import.meta.env;

const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// הדפסה לדיאגנוסטיקה
console.log('Environment keys found:', Object.keys(env).filter(k => k.includes('SUPABASE')));

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase Config. Available Env Keys:', Object.keys(env));
  throw new Error("Supabase URL or Key is missing.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)