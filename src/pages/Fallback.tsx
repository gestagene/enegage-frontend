import { useNavigate, Link } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="shrink-0 flex flex-col justify-center items-center h-screen w-full pointer-none">
      <IoWarningOutline className="mb-2" size={60} />
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <h2 className="text-md">This page was not found.</h2>
      <div className="mt-5 flex space-x-6">
        <button
          className="text-md text-white shadow-lg border bg-green-900 py-2 px-6 rounded-full"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
        <Link to="/" replace>
          <button className="text-md bg-white border border-gray-100 shadow-sm py-2 px-6 rounded-full">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
