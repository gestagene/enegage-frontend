import { useState } from "react";
import { userLogin, googleLogin } from "@/services/userLogin.js";
import { userSignup } from "@/services/userSignup";
import supabase from "@/services/supabaseClient";

export function useAuth(onSuccess: () => void, onClose: () => void) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleGoogleLogin(credentialResponse: any) {
    try {
      const data = await googleLogin(credentialResponse.credential);
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const data = await userLogin(email, password);

      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await userSignup(email, password, username);
      setSuccessMessage("Check your email to confirm your account.");
      setEmail("");
      setPassword("");
      setUsername("");
      setTimeout(() => setSuccessMessage(""), 7000);
    } catch (err: any) {
      setError(err.message);
    }
  }

  function switchToSignUp() {
    setShowSignUp(true);
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  }

  function switchToLogin() {
    setShowSignUp(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setError("");
  }

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    error,
    showSignUp,
    successMessage,
    handleLogin,
    handleGoogleLogin,
    handleSignup,
    switchToSignUp,
    switchToLogin,
  };
}
