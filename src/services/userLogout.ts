import supabase from "@/services/supabaseClient";

export async function userLogout() {
  await supabase.auth.signOut(); // clears cookie automatically
}
