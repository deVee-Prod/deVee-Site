import { createClient } from '@supabase/supabase-js'

// בדיקה ישירה - מה הערכים שהוזרקו באמת?
const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('--- DEBUG SUPABASE ---');
console.log('URL Length:', rawUrl ? rawUrl.length : 0);
console.log('Key Length:', rawKey ? rawKey.length : 0);
console.log('Key Starts With:', rawKey ? rawKey.substring(0, 5) : 'NONE');

export const supabase = createClient(rawUrl || '', rawKey || '');