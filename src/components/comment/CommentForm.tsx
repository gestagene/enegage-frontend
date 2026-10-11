import { useEffect, useRef, useState } from "react";
import { useSubmitComment } from "@/hooks/useSubmitComment";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<unknown>;
  initialValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
  startExpanded?: boolean;
  onCancel?: () => void;
  className?: string;
}

export default function CommentForm({
  onSubmit,
  initialValue = "",
  placeholder = "Join the conversation",
  autoFocus = false,
  startExpanded = false,
  onCancel,
  className = "my-4",
}: CommentFormProps) {
  const [isExpanded, setIsExpanded] = useState(startExpanded);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { comment, setComment, isSubmitting, error, isDisabled, handleSubmit } =
    useSubmitComment(onSubmit, initialValue);

  useEffect(() => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, [comment]);

  useEffect(() => {
    const element = textareaRef.current;
    if (!element || !autoFocus) return;
    element.focus();
    element.setSelectionRange(element.value.length, element.value.length);
  }, [autoFocus]);

  const handleCancel = () => {
    if (onCancel) return onCancel();
    setComment(initialValue);
    setIsExpanded(false);
  };

  return (
    <div
      className={`flex flex-col rounded-2xl border border-gray-300 focus-within:border-gray-500 ${className}`}
    >
      <form onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          onFocus={() => setIsExpanded(true)}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          name="comment"
          placeholder={placeholder}
          className="min-h-10 w-full resize-none overflow-hidden p-3 text-sm placeholder:text-sm focus:outline-none"
        />

        {error && <p className="px-3 pb-1 text-xs text-red-500">{error}</p>}

        {isExpanded && (
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex gap-2">{/* Buttons go here */}</div>

            <div className="flex gap-2 text-xs font-medium">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCancel}
                className="rounded-full bg-gray-300 px-3 py-2"
              >
                Cancel
              </button>

              {!isSubmitting ? (
                <button
                  disabled={isDisabled}
                  type="submit"
                  className="rounded-full bg-black px-3 py-2 text-white disabled:pointer-events-none disabled:bg-gray-300"
                >
                  Comment
                </button>
              ) : (
                <div className="pointer-events-none flex w-25 items-center justify-center rounded-full bg-gray-400 px-4 py-2 opacity-85">
                  <div className="h-5 w-5 animate-spin rounded-full border-3 border-gray-300 border-t-transparent" />
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
