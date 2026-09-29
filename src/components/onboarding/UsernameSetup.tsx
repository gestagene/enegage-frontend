import { useUsername } from "@/hooks/useUsername";

export default function UsernamePopup() {
  const { username, setUsername, isLoading, handleCreateUsername, error } =
    useUsername();

  return (
    <form
      id="username-form"
      onSubmit={handleCreateUsername}
      className="fixed inset-0 flex items-center justify-center bg-black/50 min-h-screen z-2 p-3"
    >
      <div className="relative w-full sm:w-lg px-8 sm:px-16 h-full bg-white rounded-xl flex flex-col items-center gap-4 pt-18 pb-8">
        {/*Close Button */}

        <div className="font-bold text-2xl">Create your username</div>
        <div className="text-sm text-center font-light">
          Your username is how people will find and recognize you on the
          platform. Choose something you like—you can always change it later.
        </div>
        <div className="flex relative w-full bg-gray-100 rounded-xl h-14 p-2">
          <input
            className="focus:outline-0 peer p-2 w-full h-full"
            type="text"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#888] pointer-events-none transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-valid:top-2 peer-valid:translate-y-0 peer-valid:text-[10px]">
            Username
          </label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          form="username-form"
          disabled={isLoading || !username}
          type="submit"
          className="sticky mt-auto w-full p-3 bg-green-900 text-white rounded-full hover:cursor-pointer hover:brightness-85 disabled:opacity-75 duration-200"
          value="Submit"
        >
          {isLoading ? (
            <div className="mx-auto w-6 h-6 border-3 border-gray-300 border-t-transparent rounded-full animate-spin" />
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </form>
  );
}
