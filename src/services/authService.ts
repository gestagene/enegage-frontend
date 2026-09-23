import { supabase } from "@/lib/supabaseClient";
import { googleLogout } from "@react-oauth/google";

export async function registerUser(email: string, password: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to register user");
  }
  return data;
}

export async function userLogout() {
  await supabase.auth.signOut();
  googleLogout();
}
