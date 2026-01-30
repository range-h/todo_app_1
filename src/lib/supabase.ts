import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_API_KEY!;

// Server-side Supabase client for API routes
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
