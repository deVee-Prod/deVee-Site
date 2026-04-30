import { createClient } from '@supabase/supabase-js'

// העתק את הכתובת והמפתח ישירות מה-Dashboard של Supabase (Settings -> API)
const supabaseUrl = 'https://plndftoilwwgvilkwsun.supabase.co/rest/v1/'; // הכתובת שלך
const supabaseAnonKey = 'sb_publishable_QmTMGt6DaboaiwwdUrUPDg_REcZ9pj4'; // המפתח הארוך שמתחיל ב-eyJ

console.log('--- PRODUCTION DEBUG ---');
console.log('Using Hardcoded Credentials');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});