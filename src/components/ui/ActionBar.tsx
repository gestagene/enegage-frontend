import { PiChatCircleLight } from "react-icons/pi";
import { PiArrowFatUpLight } from "react-icons/pi";
import { BsArrowRepeat } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";
import { PiArrowFatDownLight } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";
import type { vote } from "@/types/post";
type ActionBarProps = {
  voteScore?: number;
  vote: vote | null;
  handleVote: (v: vote) => void;
};

export default function ActionBar({
  voteScore,
  vote,
  handleVote,
}: ActionBarProps) {
  return (
    <div className="flex space-x-2 items-center">
      <div
        className={`flex justify-between items-center rounded-full w-auto ${
          vote === "up"
            ? "bg-green-800 text-white"
            : vote === "down"
              ? "bg-blue-800 text-white"
              : "bg-gray-200"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleVote("up");
          }}
          className={`${vote === "up" ? "hover:bg-green-900" : vote === "down" ? "hover:bg-blue-900" : "hover:bg-gray-300"} rounded-full py-1 px-2`}
        >
          {vote === "up" ? (
            <PiArrowFatUpFill size={20} />
          ) : (
            <PiArrowFatUpLight size={20} />
          )}
        </button>
        <span className="text-xs">{voteScore}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleVote("up");
          }}
          className={`${vote === "up" ? "hover:bg-green-900" : vote === "down" ? "hover:bg-blue-900" : "hover:bg-gray-300"} rounded-full py-1 px-2`}
        >
          {vote === "down" ? (
            <PiArrowFatDownFill size={20} />
          ) : (
            <PiArrowFatDownLight size={20} />
          )}
        </button>
      </div>

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
