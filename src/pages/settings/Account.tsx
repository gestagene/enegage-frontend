import { FaChevronRight } from "react-icons/fa6";
import { Switch } from "@/components/ui/switch";

export default function Account() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-md font-semibold">General</div>
      <button className="flex justify-between text-xs group items-center">
        <div>Email address</div>
        <div className="flex items-center gap-2">
          <div>dummy@gmail.com</div>
          <FaChevronRight
            size={30}
            className="rounded-full p-2 group-hover:bg-gray-200 transition duration-100"
          />
        </div>
      </button>
      <button className="flex justify-between text-xs group items-center">
        <div>Password</div>
        <div className="flex items-center gap-2">
          <span>*****</span>
          <FaChevronRight
            size={30}
            className="rounded-full p-2 group-hover:bg-gray-200 transition duration-100"
          />
        </div>
      </button>
      {/*Account Links*/}
      <div className="text-md font-semibold">Account Authorization</div>
      <button className="flex justify-between text-xs items-center">
        <div>Google</div>
        <button className="p-2 bg-gray-200 rounded-full">Connect</button>
      </button>
      <button className="flex justify-between text-xs">
        <span>Two-factor Authentication</span>
        <span className="scale-130 mr-2">
          <Switch size="default" />
        </span>
      </button>
      {/*Advanced*/}
      <div className="text-md font-semibold">Advanced</div>
      <button className="flex justify-between text-xs items-center group ">
        <div>Delete Account</div>
        <FaChevronRight
          size={30}
          className="rounded-full p-2 group-hover:bg-gray-200 transition duration-100"
        />
      </button>
    </div>
  );
}
