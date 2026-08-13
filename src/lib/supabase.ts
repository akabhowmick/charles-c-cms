import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishable_key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

/**
 * When env vars are present we talk to a real Supabase project.
 * When they're absent the app runs in "mock mode": auth and signups
 * are simulated in memory so the demo works with zero setup.
 */
export const supabase: SupabaseClient | null =
  url && publishable_key ? createClient(url, publishable_key) : null;

export const isMockMode = supabase === null;
