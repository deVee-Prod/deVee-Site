import { createClient } from '@supabase/supabase-js'

// 1. הכתובת הנקייה
const supabaseUrl = 'https://plndftoilwwgvilkwsun.supabase.co'; 

// 2. ה-Anon Key מה-Legacy (הזה שמתחיל ב-eyJ)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbmRmdG9pbHd3Z3ZpbGt3c3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MzI5NDgsImV4cCI6MjA5MzEwODk0OH0.Zwn4n3r1n7B0QnA9tsVRRq0FbNjzHKcnqGUoLAodCJs'; // תדביק פה רק את ה-anon!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});