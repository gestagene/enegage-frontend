import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form className="relative flex flex-col gap-4 w-full">
      <div className="relative w-full bg-gray-100 rounded-xl h-14 p-2">
        <input
          className="focus:outline-0 peer p-2 w-full h-full"
          type="text"
          required
        />
        <label className="text-sm peer-focus:top-4 peer-focus:text-[10px] peer-valid:top-0 peer-valid:text-[11px] absolute left-3 top-[60%] translate-y-[-60%]  text-[#888] pointer-events-none duration-200 ease-in-out">
          Email
        </label>
      </div>
      <div className="relative  w-full bg-gray-100 rounded-xl h-14 p-2">
        <input
          className="focus:outline-0 peer p-2 w-full h-full"
          type="text"
          required
        />
        <label className="text-sm peer-focus:top-4 peer-focus:text-[10px] peer-valid:top-0 peer-valid:text-[11px] absolute left-3 top-[60%] translate-y-[-60%]  text-[#888] pointer-events-none duration-200 ease-in-out">
          Password
        </label>
      </div>
      {!isLoading ? (
        <input
          type="submit"
          className="align-bottom bg-green-900 text-white p-2.5 rounded-full hover:cursor-pointer hover:brightness-85 w-full disabled:opacity-75 duration-200"
          value="Submit"
        />
      ) : (
        <div className="flex items-center justify-center h-auto bg-green-900 opacity-75 rounded-full pointer-events-none w-full p-2.5">
          <div className="w-8 h-8 border-3 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </form>
  );
}
