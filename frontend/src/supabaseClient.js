import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://plndftoilwwgvilkwsun.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbmRmdG9pbHd3Z3ZpbGt3c3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MzI5NDgsImV4cCI6MjA5MzEwODk0OH0.Zwn4n3r1n7B0QnA9tsVRRq0FbNjzHKcnqGUoLAodCJs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

// Mirror auth state to a cookie readable by all *.devee-music.com subdomains
supabase.auth.onAuthStateChange((_event, session) => {
  if (typeof document === 'undefined') return;
  if (session) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `devee_auth=1; domain=.devee-music.com; path=/; expires=${expires.toUTCString()}; SameSite=Lax; Secure`;
  } else {
    document.cookie = `devee_auth=; domain=.devee-music.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`;
  }
});
