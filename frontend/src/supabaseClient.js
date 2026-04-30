import { createClient } from '@supabase/supabase-js'

const env = import.meta.env;

// זה ידפיס לנו בדיוק את השמות ש-Vite הצליח למשוך
console.log('Vite is seeing these keys:', Object.keys(env).filter(k => k.includes('SUPABASE')));

// ניסיון משיכה דינמי - לוקח את המפתח הראשון שכולל URL והראשון שכולל KEY
const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || env[Object.keys(env).find(k => k.includes('URL'))];
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env[Object.keys(env).find(k => k.includes('KEY'))];

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase config still not mapping correctly.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)