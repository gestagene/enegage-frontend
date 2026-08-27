import { CgTrashEmpty } from "react-icons/cg";
import { CgBookmark } from "react-icons/cg";
import { PiFlagBanner } from "react-icons/pi";

type PostCardMenuProps = {
  handleDelete: () => void;
  isOwner: boolean;
};
export default function PostCardMenu({
  handleDelete,
  isOwner,
}: PostCardMenuProps) {
  return (
    <div className="absolute top-6 sm:text-sm z-1 right-4 flex flex-col min-h-20 min-w-1/2 sm:min-w-50 md:min-h-auto bg-white border-b  rounded-b-xs shadow-lg border-gray-200 overflow-hidden">
      {isOwner && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="hover:bg-gray-200 hover:cursor-pointer flex px-6 py-2"
        >
          <div className="flex gap-2 items-center text-xs ">
            <CgTrashEmpty size={20} />
            Delete
          </div>
        </button>
      )}
      <button className="hover:bg-gray-200 hover:cursor-pointer flex px-6 py-2">
        <div className="flex gap-2 items-center text-xs ">
          <CgBookmark size={20} />
          Save
        </div>
      </button>
      <button className="hover:bg-gray-200 hover:cursor-pointer flex px-6 py-2">
        <div className="flex gap-2 items-center text-xs ">
          <PiFlagBanner size={20} />
          Report
        </div>
      </button>
    </div>
  );
}
