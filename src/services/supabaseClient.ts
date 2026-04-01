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
  getItem: (key: string): string | null => {
    // Try reading as a single cookie first
    const single = getCookie(key);
    if (single) return single;

    // Fall back to reading split cookies and reassembling
    const parts: string[] = [];
    let i = 0;
    while (true) {
      const part = getCookie(`${key}.${i}`);
      if (!part) break;
      parts.push(part);
      i++;
    }
    return parts.length > 0 ? parts.join("") : null;
  },

  setItem: (key: string, value: string): void => {
    // Delete any old split cookies first
    let i = 0;
    while (getCookie(`${key}.${i}`)) {
      deleteCookie(`${key}.${i}`);
      i++;
    }

    const chunkSize = 3000; // safe under 4KB limit

    if (value.length <= chunkSize) {
      // Small enough — write as single cookie
      setCookie(key, value);
    } else {
      // Too large — split into chunks
      deleteCookie(key);
      let index = 0;
      for (let j = 0; j < value.length; j += chunkSize) {
        setCookie(`${key}.${index}`, value.slice(j, j + chunkSize));
        index++;
      }
    }
  },

  removeItem: (key: string): void => {
    // Delete main cookie
    deleteCookie(key);
    // Delete any split cookies
    let i = 0;
    while (getCookie(`${key}.${i}`)) {
      deleteCookie(`${key}.${i}`);
      i++;
    }
  },

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
