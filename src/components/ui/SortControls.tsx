import { RiArrowDropDownLine } from "react-icons/ri";

export default function SortControls() {
  return (
    <>
      <div className="relative mx-2 my-1">
        <div className="flex justify-center items-center">
          <button className="flex justify-around items-center py-1 px-2 rounded-4xl bg-gray-100">
            <span className="text-xs">Sort</span>
            <RiArrowDropDownLine size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
