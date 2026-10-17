import { Images, Trash, ChevronLeft, ChevronRight } from "lucide-react";

interface SubmitImageOverlayProps {
  count: number;
  current: number;
  canAdd: boolean;
  onRemove: () => void;
  onAdd?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}
export default function SubmitImageOverlay({
  count,
  current,
  canAdd,
  onRemove,
  onAdd,
  onNext,
  onPrev,
}: SubmitImageOverlayProps) {
  return (
    <div className="text-xs flex flex-col absolute z-1 inset-0 p-2 overflow-hidden border border-gray-100">
      <div className="flex items-center justify-between">
        <button
          onClick={onAdd}
          disabled={!canAdd}
          type="button"
          className={`size-9 justify-center pointer-events-auto hover:bg-black/90 duration-200 flex items-center gap-2 rounded-full bg-neutral-900 p-2 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <Images />
        </button>

        <span className="rounded-full bg-black/70 px-2 py-1 text-white font-medium">
          {current + 1} / {count}
        </span>

        <button
          onClick={onRemove}
          type="button"
          className="hover:bg-black/90 duration-200 items-center bg-neutral-900 p-2 text-white font-medium rounded-full size-9 justify-center flex"
        >
          <Trash />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-between ">
        <button
          onClick={onPrev}
          type="button"
          className="rounded-full p-2 bg-neutral-900 text-white size-9 justify-center flex items-center"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={onNext}
          type="button"
          className="rounded-full p-2 bg-neutral-900 text-white size-9 justify-center flex items-center"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
