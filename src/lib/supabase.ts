import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * When env vars are present we talk to a real Supabase project.
 * When they're absent the app runs in "mock mode": auth and signups
 * are simulated in memory so the demo works with zero setup.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isMockMode = supabase === null;
