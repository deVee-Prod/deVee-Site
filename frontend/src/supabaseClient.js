import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://plndftoilwwgvilkwsun.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbmRmdG9pbHd3Z3ZpbGt3c3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MzI5NDgsImV4cCI6MjA5MzEwODk0OH0.Zwn4n3r1n7B0QnA9tsVRRq0FbNjzHKcnqGUoLAodCJs';

const cookieStorage = {
  getItem: (key) => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(?:^|; )' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  },
  setItem: (key, value) => {
    if (typeof document === 'undefined') return;
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${key}=${encodeURIComponent(value)}; domain=.devee-music.com; path=/; expires=${expires.toUTCString()}; SameSite=Lax; Secure`;
  },
  removeItem: (key) => {
    if (typeof document === 'undefined') return;
    document.cookie = `${key}=; domain=.devee-music.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`;
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: cookieStorage
  }
});
