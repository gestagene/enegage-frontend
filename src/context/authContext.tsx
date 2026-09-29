import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  userId: string | null;
  user: User | null;
  needsUsername: boolean;
  setNeedsUsername: React.Dispatch<React.SetStateAction<boolean>>;
  refreshProfile: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [needsUsername, setNeedsUsername] = useState(false);

  const checkUsername = useCallback(async (currentUser: User | null) => {
    if (!currentUser) {
      setNeedsUsername(false);
      return;
    }
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("id", currentUser.id)
      .maybeSingle();

    if (error) {
      console.error("Failed to check username:", error);
      return;
    }
    setNeedsUsername(!data?.username);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setUser(session?.user ?? null);
      await checkUsername(session?.user ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsLoggedIn(!!session);
      setUser(session?.user ?? null);
      setTimeout(() => checkUsername(session?.user ?? null), 0);
    });

    return () => subscription.unsubscribe();
  }, []);

  const refreshProfile = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    await checkUsername(session?.user ?? null);
  }, [checkUsername]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        user,
        userId: user?.id ?? null,
        needsUsername,
        setNeedsUsername,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
