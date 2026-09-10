import { FiTrash } from "react-icons/fi";
import { FaRegImages } from "react-icons/fa";
import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";

export default function SubmitImageOverlay() {
  return (
    <div className="text-xs flex flex-col absolute z-1 inset-0 p-2 overflow-hidden">
      <div className="flex items-center justify-between">
        <button className="hover:bg-black/90 duration-200 flex items-center gap-2 rounded-full bg-black/70 px-2 py-2 text-white font-medium">
          <FaRegImages size={16} />
          <span className="hidden sm:block">Add</span>
        </button>

        <button className="hover:bg-black/90 duration-200 items-center bg-black/70 px-2 py-2 text-white font-medium rounded-full">
          <FiTrash size={16} />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-between">
        <button className="rounded-full bg-black/70 p-2 text-white">
          <LuChevronLeft size={18} />
        </button>
        <button className="rounded-full bg-black/70 p-2 text-white">
          <LuChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
