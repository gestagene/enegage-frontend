import { Link } from "react-router-dom";
import { GiPenguin } from "react-icons/gi";

export default function ErrorPage() {
  return (
    <>
      <div className="flex justify-center items-center text-2xl pointer-none min-h-screen bg-gray-50">
        <h1>
          <GiPenguin size={200} className="text-gray-900" />
        </h1>
        <h1>
          It looks like you're lost.{" "}
          <Link
            to="/"
            className="text-blue-800 underline hover:text-blue-500 transition-colors"
          >
            Here's the way back.
          </Link>
        </h1>
      </div>
    </>
  );
}
