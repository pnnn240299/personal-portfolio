import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

// Create a mock client that will show clear error messages
const mockSupabase = {
  from: () => {
    throw new Error('Supabase not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file.');
  },
  auth: {
    signIn: () => Promise.reject(new Error('Supabase not configured')),
    signOut: () => Promise.reject(new Error('Supabase not configured')),
    getUser: () => Promise.reject(new Error('Supabase not configured')),
    onAuthStateChange: () => ({ data: { subscription: null }, unsubscribe: () => {} })
  }
};

// Check if environment variables are properly set
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env file:');
  console.error('- SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.error('- SUPABASE_ANON_KEY:', supabaseKey ? 'Set' : 'Missing');
}

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : mockSupabase;

export default supabase;
