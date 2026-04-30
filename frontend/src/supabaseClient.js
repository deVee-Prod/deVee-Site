import { createClient } from '@supabase/supabase-js'

// הערכים האלו יוחלפו בטקסט האמיתי בזמן ה-Build ב-Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Critical: Supabase configuration is missing after injection.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)