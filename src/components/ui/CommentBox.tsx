export default function CommentBox() {
  return (
    <div className="mt-4 flex flex-col rounded-lg border border-gray-200 focus-within:border-gray-400">
      <textarea
        name="comment"
        placeholder="Join the conversation"
        autoFocus
        className="
          min-h-20
          resize-y
          rounded-t-lg
          p-3
          placeholder:text-sm
          focus:outline-none
        "
      />

      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex gap-2">{/*Buttons go here*/}</div>

        <div className="flex gap-2 text-xs font-medium">
          <button className="rounded-full bg-gray-300 px-3 py-2">Cancel</button>

          <button className="rounded-full bg-black px-3 py-2 text-white">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
