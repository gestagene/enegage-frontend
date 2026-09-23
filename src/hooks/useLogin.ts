import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { CredentialResponse } from "@react-oauth/google";

export function useLogin(onSuccess: () => void) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin(credentialResponse: CredentialResponse) {
    setError("");
    setIsLoading(true);

    try {
      if (!credentialResponse.credential) {
        throw new Error("Google sign-in failed. Please try again.");
      }
      const { error: authError } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: credentialResponse.credential,
      });
      if (authError) throw authError;
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
    handleGoogleLogin,
  };
}
