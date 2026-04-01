import supabase from "@/services/supabaseClient";
import { googleLogout } from "@react-oauth/google";

export async function userLogout() {
  await supabase.auth.signOut();
  googleLogout();
}
