import { useState } from "react";
import { createUsername } from "@/services/userService";
import { useAuth } from "@/context/authContext";

export function useUsername() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setNeedsUsername } = useAuth();

  async function handleCreateUsername(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await createUsername(username);
      setUsername("");
      setNeedsUsername(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Username creation failed");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    username,
    setUsername,
    error,
    isLoading,
    handleCreateUsername,
  };
}
