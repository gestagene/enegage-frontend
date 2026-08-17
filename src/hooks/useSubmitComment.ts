import { createComment } from "@/services/comments";
import { useAuth } from "@/context/authContext";
import { useState } from "react";

export function useSubmitComment(postId: string, onSuccess?: () => void) {
  const { isLoggedIn } = useAuth();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      if (!isLoggedIn) {
        throw new Error("You must be logged in to post a comment");
      }
      if (!comment) {
        throw new Error("Comment content can't be empty");
      }
      await createComment(postId, comment);
      onSuccess?.();
      setComment("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isDisabled = !comment.trim();

  return { comment, setComment, isSubmitting, error, isDisabled, handleSubmit };
}
