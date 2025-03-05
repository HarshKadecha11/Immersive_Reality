import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Get environment variables
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback to hardcoded values if environment variables are not set or invalid
if (!supabaseUrl || supabaseUrl === "https://your-project-url.supabase.co") {
  supabaseUrl = "https://xyzcompany.supabase.co";
  console.warn(
    "Using fallback Supabase URL. Please set VITE_SUPABASE_URL in your environment variables.",
  );
}

if (!supabaseAnonKey || supabaseAnonKey === "your-anon-key") {
  supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdGJyc3Bub3Zib2JpaWZ0aHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NTQwMDcsImV4cCI6MjAxNTUzMDAwN30.fallback_key_for_development";
  console.warn(
    "Using fallback Supabase anon key. Please set VITE_SUPABASE_ANON_KEY in your environment variables.",
  );
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "supabase.auth.token",
    storage: window.localStorage,
  },
});

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl !== undefined &&
    supabaseUrl !== "https://your-project-url.supabase.co" &&
    supabaseAnonKey !== undefined &&
    supabaseAnonKey !== "your-anon-key"
  );
};
