import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// Defensive check to prevent crash on invalid URL
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Return a real client if keys exist, otherwise a "safe mock" object to prevent crashes
export const supabase = (supabaseUrl && isValidUrl(supabaseUrl) && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ data: {}, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({ order: () => ({ limit: () => ({ single: () => ({ maybeSingle: () => ({}) }) }) }) }),
        insert: () => ({}),
        update: () => ({ eq: () => ({}) }),
        delete: () => ({ eq: () => ({}) }),
      }),
      storage: {
        from: () => ({
          upload: async () => ({ error: new Error('Supabase not configured') }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as any;

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !supabaseAnonKey) {
  console.warn('Supabase client is running in MOCK mode. Check your .env.local keys.');
}
