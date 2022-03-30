import { createClient } from "@supabase/supabase-js";

const supabaseUrl = __api.env.VITE_SUPABASE_URL;
const supabaseAnonKey = __api.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
