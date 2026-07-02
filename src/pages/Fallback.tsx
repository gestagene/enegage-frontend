import { Link } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

export default function ErrorPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full pointer-none">
        <IoWarningOutline className="mb-2" size={60} />
        <h1 className="text-xl font-bold">Something went wrong</h1>
        <h2 className="text-md">This page was not found.</h2>
        <div className="mt-5">
          <Link to="/" replace>
            <button className="text-md text-white bg-black py-2 px-4 rounded-2xl">
              Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
