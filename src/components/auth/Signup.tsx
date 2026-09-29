import { useSignup } from "@/hooks/useSignup";
import { useEffect } from "react";
interface LoginProps {
  onLoading: (loading: boolean) => void;
  onValidChange: (valid: boolean) => void;
}

export default function Signup({ onLoading, onValidChange }: LoginProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    successMessage,
    isLoading,
    handleSignup,
  } = useSignup();

  useEffect(() => {
    onLoading(isLoading);
  }, [isLoading, onLoading]);

  useEffect(() => {
    onValidChange(email.trim() !== "" && password.trim() !== "");
  }, [email, password, onValidChange]);

  return (
    <form
      id="signup-form"
      onSubmit={handleSignup}
      className="relative flex flex-col gap-4 w-full"
    >
      <div className="relative w-full bg-gray-100 rounded-xl h-14 p-2">
        <input
          className="focus:outline-0 peer p-2 w-full h-full"
          type="text"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#888] pointer-events-none transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-valid:top-2 peer-valid:translate-y-0 peer-valid:text-[10px]">
          Email
        </label>
      </div>
      <div className="relative  w-full bg-gray-100 rounded-xl h-14 p-2">
        <input
          className="focus:outline-0 peer p-2 w-full h-full"
          type="password"
          value={password}
          placeholder=" "
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#888] pointer-events-none transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-valid:top-2 peer-valid:translate-y-0 peer-valid:text-[10px]">
          Password
        </label>
      </div>

      {successMessage && (
        <p className="text-green-600 text-sm">{successMessage}</p>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
