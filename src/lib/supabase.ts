import { createClient } from "@supabase/supabase-js";

// Provide default values for development
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://your-project-url.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log warning if using default values
if (supabaseUrl === "https://your-project-url.supabase.co") {
  console.warn(
    "Using default Supabase URL. Please set VITE_SUPABASE_URL in your .env file.",
  );
}

if (supabaseAnonKey === "your-anon-key") {
  console.warn(
    "Using default Supabase anon key. Please set VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}
