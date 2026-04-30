import { createClient } from '@supabase/supabase-js'

// ניסיון שליפה מכל מקום אפשרי
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

console.log('--- FINAL DEBUG ---');
console.log('Final URL Check:', !!supabaseUrl);

// יצירת קליינט עם בדיקה שמונעת את ה-Uncaught Error
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Credentials still missing! Try adding them directly to the code to test.");
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');