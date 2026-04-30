import { createClient } from '@supabase/supabase-js'

// פונקציית עזר לניקוי ערכים מרווחים או גרשיים מיותרים
const cleanEnv = (val) => {
  if (!val) return '';
  return val.replace(/['"]+/g, '').trim();
};

const supabaseUrl = cleanEnv(import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = cleanEnv(import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// בדיקה ב-Console - אם תראה כאן false, סימן שהערך לא הגיע מה-Vercel
console.log('Is URL Valid?', !!supabaseUrl);
console.log('Is Key Valid?', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase Configuration Missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})