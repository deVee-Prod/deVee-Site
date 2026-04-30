import { createClient } from '@supabase/supabase-js'

// שימוש ב-import.meta.env - הדרך היחידה ש-Vite מכיר
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// הדפסה ל-Console כדי שנדע בדיוק מה הגיע (אל דאגה, זה רק ב-Console)
console.log('Supabase URL status:', supabaseUrl ? 'Found' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  // אם אנחנו כאן, סימן ש-Vite עדיין חוסם את הגישה למשתנים
  throw new Error("Supabase URL or Key is missing. Check Vercel Environment Variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)