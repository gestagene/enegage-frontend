import { PiArrowFatUpLight } from "react-icons/pi";
import { PiShareFat } from "react-icons/pi";
import { PiArrowFatDownLight } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import { Reply, Repeat, MessageCircle } from "lucide-react";
import type { vote } from "@/types/post";
type ActionBarProps = {
  voteScore: number;
  vote: vote | null;
  handleVote: (v: vote) => void;
  variant: "post" | "comment";
  commentCount?: number;
  handleNavigate?: () => void;
};

export default function ActionBar({
  voteScore,
  vote,
  handleVote,
  variant,
  commentCount,
  handleNavigate,
}: ActionBarProps) {
  return (
    <div className="flex space-x-2 items-center py-1">
      <div
        className={`flex justify-between items-center rounded-full w-auto ${
          variant === "post"
            ? vote === "up"
              ? "bg-green-800 text-white"
              : vote === "down"
                ? "bg-blue-800 text-white"
                : "bg-gray-180/75"
            : "bg-transparent"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleVote?.("up");
          }}
          className={`${variant === "post" ? (vote === "up" ? "hover:bg-green-900" : vote === "down" ? "hover:bg-blue-900" : "hover:bg-gray-300") : "hover:bg-gray-300"} rounded-full py-1 px-1.5`}
        >
          {vote === "up" ? (
            <PiArrowFatUpFill
              className={`${variant === "comment" && "text-green-900"}`}
              size={18}
            />
          ) : (
            <PiArrowFatUpLight size={18} />
          )}
        </button>
        <span className={`text-xs w-3 shrink-0 grow-0 text-center`}>
          {voteScore}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleVote?.("down");
          }}
          className={`${variant === "post" ? (vote === "up" ? "hover:bg-green-900" : vote === "down" ? "hover:bg-blue-900" : "hover:bg-gray-300") : "hover:bg-gray-300"} rounded-full py-1 px-1.5`}
        >
          {vote === "down" ? (
            <PiArrowFatDownFill
              className={`${variant === "comment" && "text-blue-900"}`}
              size={18}
            />
          ) : (
            <PiArrowFatDownLight size={18} />
          )}
        </button>
      </div>

      <button
        onClick={handleNavigate}
        className={`flex space-x-1 w-auto justify-center hover:bg-gray-300 hover:cursor-pointer items-center py-1.5 px-1.5 rounded-full text-xs text-black ${variant === "post" ? "bg-gray-180/75" : "bg-transparent"}`}
      >
        <span className="flex items-center space-x-1">
          {variant === "post" && <MessageCircle strokeWidth={1.2} size={18} />}
          {variant === "comment" && (
            <Reply strokeWidth={1.2} className="mr-1" size={18} />
          )}
          {variant === "comment" && "Reply"}
        </span>
      </button>
      <button
        className={`flex space-x-1  justify-center hover:bg-gray-300 hover:cursor-pointer items-center p-1.5 rounded-full ${variant === "post" ? "bg-gray-180/75" : "bg-transparent hidden"}`}
      >
        <Repeat size={18} strokeWidth={1.3} />
      </button>
      <button
        className={`flex space-x-1  justify-center hover:bg-gray-300 hover:cursor-pointer items-center py-1.5 px-1.5 rounded-full ${variant === "post" ? "bg-gray-180/75" : "bg-transparent"}`}
      >
        <PiShareFat size={18} />
      </button>
      <button
        className={`hover:bg-gray-300 rounded-full py-1.5 px-1.5 ${variant === "comment" ? "flex" : "hidden"}`}
      >
        <BsThreeDots size={15} />
      </button>
    </div>
  );
}
