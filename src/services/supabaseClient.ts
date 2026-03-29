import { createClient } from "@supabase/supabase-js";

export function getCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

export function setCookie(name: string, value: string, days: number = 7): void {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  const isSecure = location.protocol === "https:";
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${
    isSecure ? "; Secure" : ""
  }`;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const cookieStorage: Storage = {
  getItem: (key: string): string | null => getCookie(key),
  setItem: (key: string, value: string): void => setCookie(key, value),
  removeItem: (key: string): void => deleteCookie(key),
  clear: (): void => {},
  key: (_index: number): string | null => null,
  length: 0,
};

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_API_KEY as string,
  {
    auth: {
      storage: cookieStorage,
      storageKey: "sb-session",
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

export default supabase;
