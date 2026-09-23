import { useState, useEffect } from "react";
import { registerUser } from "@/services/authService";

export function useSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!successMessage) return;
    const id = setTimeout(() => setSuccessMessage(""), 7000);
    return () => clearTimeout(id);
  }, [successMessage]);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await registerUser(email, password);
      setSuccessMessage("Please check your email for verification");
      setEmail("");
      setPassword("");
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
    successMessage,
    isLoading,
    handleSignup,
  };
}
