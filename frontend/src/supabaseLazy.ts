/**
 * Loads the Supabase client on demand so its ~100KB+ of JS stays out of the
 * critical initial bundle (keeps first paint / LCP fast on mobile).
 */
export const getSupabase = () => import('./supabaseClient').then((m) => m.supabase);
