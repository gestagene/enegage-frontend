import { useLogin } from "@/hooks/useLogin";

interface LoginProps {
  onSuccess: () => void;
}
export default function Login({ onSuccess }: LoginProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  } = useLogin(onSuccess);
  return (
    <form
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
      {!isLoading ? (
        <input
          type="submit"
          className="w-full p-2.5 bg-green-900 text-white rounded-full hover:cursor-pointer hover:brightness-85 disabled:opacity-75 duration-200"
          value="Submit"
        />
      ) : (
        <div className="flex items-center justify-center w-full p-2.5 bg-green-900 opacity-75 rounded-full pointer-events-none">
          <div className="w-8 h-8 border-3 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
}
