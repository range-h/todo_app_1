import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase environment variables are missing. Please check SUPABASE_URL and SUPABASE_API_KEY.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
