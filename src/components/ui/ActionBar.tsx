import { PiChatCircleLight } from "react-icons/pi";
import { PiArrowFatUpLight } from "react-icons/pi";
import { BsArrowRepeat } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";
import { PiArrowFatDownLight } from "react-icons/pi";

export default function ActionBar({ likes }: { likes?: string }) {
  return (
    <div className="flex space-x-2 items-center">
      <button className="flex gap-1  justify-center items-center bg-gray-200/75 rounded-full w-18 text-xs">
        <span className="p-1 hover:text-green-800 hover:bg-gray-300 rounded-full hover:cursor-pointer">
          <PiArrowFatUpLight size={20} />
        </span>
        <span>{likes}</span>
        <span className="p-1 hover:text-blue-800 hover:bg-gray-300 rounded-full hover:cursor-pointer">
          <PiArrowFatDownLight size={20} />
        </span>
      </button>
      <button className="flex space-x-1  justify-center hover:bg-gray-300 hover:cursor-pointer items-center py-1 px-1 bg-gray-200/75 rounded-full w-8 text-xs text-black">
        <span>
          <PiChatCircleLight size={20} />
        </span>
      </button>
      <button className="flex space-x-1  justify-center hover:bg-gray-300 hover:cursor-pointer items-center py-1.5 px-1.5 bg-gray-200/75 rounded-full ">
        <span>
          <BsArrowRepeat size={20} />
        </span>
      </button>
      <button className="flex space-x-1  justify-center hover:bg-gray-300 hover:cursor-pointer items-center py-1.5 px-1.5 bg-gray-200/75 rounded-full">
        <span>
          <PiShareFat size={20} />
        </span>
      </button>
    </div>
  );
}
