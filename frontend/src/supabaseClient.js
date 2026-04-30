import { createClient } from '@supabase/supabase-js'

// ניסיון לשלוף מכל האופציות האפשריות
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// במקום Error שחוסם את האתר, רק נדפיס ל-Console
console.log('--- SUPABASE ENV CHECK ---');
console.log('URL exists:', !!supabaseUrl);
console.log('Key exists:', !!supabaseAnonKey);

// יצירת הקליינט גם אם חסר (כדי שהאתר לא יקרוס)
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});