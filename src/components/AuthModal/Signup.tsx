import { useSignup } from "@/hooks/useSignUp";

export default function Signup() {
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

  return (
    <form
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
      {!isLoading ? (
        <input
          type="submit"
          className="align-bottom bg-green-900 text-white p-2.5 rounded-full hover:cursor-pointer hover:brightness-85 w-full disabled:opacity-75 duration-200"
          value="Submit"
          disabled={!email || !password}
        />
      ) : (
        <div className="flex items-center justify-center h-auto bg-green-900 opacity-75 rounded-full pointer-events-none w-full p-2.5">
          <div className="w-8 h-8 border-3 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {successMessage && (
        <p className="text-green-600 text-sm">{successMessage}</p>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
