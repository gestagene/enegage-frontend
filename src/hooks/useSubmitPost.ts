import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Editor } from "@tiptap/react";
import { createPost } from "@/services/posts";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/context/toastContext";

export function useCreatePost(editor: Editor | null) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleFileSelect = (selected: File[]) => {
    const newUrls = selected.map((f) => URL.createObjectURL(f));
    setImageFiles((prev) => [...prev, ...selected]);
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const removeImage = (index: number) => {
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting || !editor) return;
    setIsSubmitting(true);

    try {
      if (!isLoggedIn) {
        throw new Error("Register an account in order to submit a post");
      }
      const content = editor.getJSON();
      const { post } = await createPost(title, content, imageFiles);
      showToast("Post submitted successfully");
      navigate(`/comments/${post.id}`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    imageFiles,
    previewUrls,
    handleFileSelect,
    removeImage,
    title,
    setTitle,
    isSubmitting,
    handleSubmit,
  };
}
