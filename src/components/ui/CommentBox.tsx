import { useState } from "react";
import { useSubmitComment } from "@/hooks/useSubmitComment";

export default function CommentBox({ postId }: { postId: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { comment, setComment, isSubmitting, error, isDisabled, handleSubmit } =
    useSubmitComment(postId);

  const handleResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "0px";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };
  if (error) {
    return (
      <div className="justify-center items-center bg-gray-100 rounded-md ">
        <p className="text-red-500 text-sm text-center w-full">{error}</p>
      </div>
    );
  }
  return (
    <div className="mt-4 flex flex-col rounded-2xl border border-gray-300 focus-within:border-gray-500 mb-4">
      <form onSubmit={handleSubmit}>
        <textarea
          onFocus={() => setIsExpanded(true)}
          onInput={handleInput}
          onChange={(e) => {
            setComment(e.target.value);
            handleResize(e);
          }}
          value={comment}
          name="comment"
          placeholder="Join the conversation"
          className="w-full
        overflow-hidden
        min-h-10
          resize-none
          p-3
          placeholder:text-sm
          focus:outline-none
          text-sm
        "
        />
        {isExpanded && (
          <div className="flex items-center justify-between px-3 py-2 ">
            <div className="flex gap-2">{/*Buttons go here*/}</div>

            <div className="flex gap-2 text-xs font-medium disabled:opacity-75">
              <button
                disabled={isSubmitting}
                onClick={() => {
                  setIsExpanded(false);
                }}
                className="rounded-full bg-gray-300 px-3 py-2"
              >
                Cancel
              </button>
              {!isSubmitting ? (
                <button
                  disabled={isDisabled}
                  type="submit"
                  className="rounded-full bg-black px-3 py-2 text-white disabled:bg-gray-300 disabled:pointer-events-none"
                >
                  Comment
                </button>
              ) : (
                <div className="flex items-center justify-center bg-gray-400  opacity-85 rounded-full pointer-events-none w-25 py-2 px-4">
                  <div className="h-5 w-5 border-3 border-gray-300 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
