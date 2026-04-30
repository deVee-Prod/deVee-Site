import { createClient } from '@supabase/supabase-js'

// שליפת הערכים שהוזרקו דרך Vite בזמן ה-Build
const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ניקוי תווים מיותרים (רווחים או לוכסנים) ליתר ביטחון
const cleanUrl = rawUrl?.trim().replace(/\/$/, '');
const cleanKey = rawKey?.trim();

console.log('--- DEBUG SUPABASE ---');
console.log('URL Status:', cleanUrl ? `Length: ${cleanUrl.length}` : 'MISSING');
console.log('Key Status:', cleanKey ? `Length: ${cleanKey.length}` : 'MISSING');
console.log('Key Starts With:', cleanKey ? cleanKey.substring(0, 5) : 'NONE');

if (!cleanUrl || !cleanKey) {
  throw new Error("Critical: Supabase URL or Key is missing from the environment.");
}

export const supabase = createClient(cleanUrl, cleanKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // שימוש ב-PKCE מבטיח תאימות מלאה לדפדפנים מודרניים ולמניעת שגיאות 401 בניתוב
    flowType: 'pkce'
  }
});