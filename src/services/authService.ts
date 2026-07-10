import { supabase } from "@/lib/supabaseClient";
import { googleLogout } from "@react-oauth/google";

export async function userLogin(email: string, password: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function googleLogin(token: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/google`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    },
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function userSignup(
  email: string,
  password: string,
  username: string,
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function userLogout() {
  await supabase.auth.signOut();
  googleLogout();
}
