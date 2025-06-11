import { createClient } from 'jsr:@supabase/supabase-js@2'

import 'jsr:@std/dotenv/load'

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;

const supabase = createClient(supabaseUrl, supabaseKey);

const email = "testuser@dev.com";
const password = "TestUser123!";

async function main() {
  // ✅ Sign up if not already created
  const { error: signupError } = await supabase.auth.signUp({ email, password });
  if (signupError) {
    console.log("Signup may already exist or failed:", signupError.message);
  }

  // ✅ Then sign in to get a JWT
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Login failed:", error.message);
  } else {
    console.log("✅ Access token:\n", data.session?.access_token);
  }
}

main();
