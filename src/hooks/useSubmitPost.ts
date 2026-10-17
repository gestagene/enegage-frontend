import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Editor } from "@tiptap/react";
import { createPost } from "@/services/posts";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/context/toastContext";

export const MAX_IMAGES = 5;

export function useSubmitPost(editor: Editor | null) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [current, setCurrent] = useState(0); //current index selected

  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const canAddMore = imageFiles.length < MAX_IMAGES;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting || !editor) return;
    setIsSubmitting(true);

    try {
      if (!isLoggedIn) {
        throw new Error("Register an account in order to submit a post");
      }
      const content = editor.isEmpty ? null : editor.getJSON();
      const { post } = await createPost(title, content, imageFiles);
      showToast("Post submitted successfully");
      navigate(`/comments/${post.id}`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Something went wrong");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  const urlsRef = useRef<string[]>([]);
  useEffect(() => {
    urlsRef.current = previewUrls;
  }, [previewUrls]);
  useEffect(() => {
    return () => urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const handleFileSelect = (selected: File[]) => {
    const images = selected.filter((f) => f.type.startsWith("image/"));
    const space = MAX_IMAGES - imageFiles.length;
    if (images.length >= space) {
      showToast(`You can only attach up to ${MAX_IMAGES} images`);
    }

    const accepted = images.slice(0, space);
    if (accepted.length === 0) return;

    const newUrls = accepted.map((f) => URL.createObjectURL(f));
    setImageFiles((prev) => [...prev, ...accepted]);
    setPreviewUrls((prev) => [...prev, ...newUrls]);
    setCurrent(imageFiles.length);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setCurrent((c) => {
      const newLength = previewUrls.length - 1;
      const next = index < c ? c - 1 : c;
      return Math.max(0, Math.min(next, newLength - 1));
    });
  };

  const next = () => setCurrent((c) => (c + 1) % previewUrls.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + previewUrls.length) % previewUrls.length);

  return {
    imageFiles,
    previewUrls,
    handleFileSelect,
    removeImage,
    title,
    setTitle,
    isSubmitting,
    handleSubmit,
    current,
    canAddMore,
    next,
    prev,
  };
}
