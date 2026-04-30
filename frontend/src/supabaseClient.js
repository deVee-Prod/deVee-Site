import { createClient } from '@supabase/supabase-js'

// שליפה ישירה של המשתנים
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ניקוי לוכסנים ורווחים כדי למנוע שגיאות ניתוב
const cleanUrl = supabaseUrl?.trim().replace(/\/$/, '');
const cleanKey = supabaseAnonKey?.trim();

if (!cleanUrl || !cleanKey) {
  throw new Error("Supabase URL or Key is missing. Check Vercel environment variables.");
}

export const supabase = createClient(cleanUrl, cleanKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce' // מבטיח שההתחברות תעבוד בדפדפנים מודרניים
  }
});