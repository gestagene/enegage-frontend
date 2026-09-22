import { FaChevronRight } from "react-icons/fa6";

export default function Profile() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-md font-semibold">General</div>
      <button className="flex justify-between text-xs group items-center">
        <div>Display Name</div>
        <div className="flex items-center gap-2">
          <div>Gene</div>
          <FaChevronRight
            size={30}
            className="rounded-full p-2 group-hover:bg-gray-200 transition duration-100"
          />
        </div>
      </button>
      <button className="flex justify-between text-xs group items-center">
        <div>About</div>
        <div className="flex items-center">
          <FaChevronRight
            size={30}
            className="rounded-full p-2 group-hover:bg-gray-200 transition duration-100"
          />
        </div>
      </button>
      <button className="flex justify-between text-xs group items-center">
        <div>Avatar</div>
        <div className="flex items-center">
          <FaChevronRight
            size={30}
            className="rounded-full p-2 group-hover:bg-gray-200 transition duration-100"
          />
        </div>
      </button>
      <button className="flex justify-between text-xs group items-center">
        <div>Institute</div>
        <div className="flex items-center">
          <div>ICS</div>
          <FaChevronRight
            size={30}
            className="rounded-full p-2 group-hover:bg-gray-200 transition duration-100"
          />
        </div>
      </button>
    </div>
  );
}
