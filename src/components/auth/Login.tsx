import { useLogin } from "@/hooks/useLogin";
import { useEffect } from "react";

interface LoginProps {
  onSuccess: () => void;
  onLoading: (loading: boolean) => void;
  onValidChange: (valid: boolean) => void;
}
export default function Login({
  onSuccess,
  onLoading,
  onValidChange,
}: LoginProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  } = useLogin(onSuccess);

  useEffect(() => {
    onLoading(isLoading);
  }, [isLoading, onLoading]);

  useEffect(() => {
    onValidChange(email.trim() !== "" && password.trim() !== "");
  }, [email, password, onValidChange]);

  return (
    <form
      id="login-form"
      onSubmit={handleLogin}
      className="relative flex flex-col gap-4 w-full"
    >
      <div className="relative w-full bg-gray-100 rounded-xl h-14 p-2">
        <input
          className="peer w-full h-full p-2 focus:outline-0 placeholder-transparent"
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
      <div className="relative w-full bg-gray-100 rounded-xl h-14 p-2">
        <input
          className="peer w-full h-full p-2 focus:outline-0 placeholder-transparent"
          type="password"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#888] pointer-events-none transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-valid:top-2 peer-valid:translate-y-0 peer-valid:text-[10px]">
          Password
        </label>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
}
