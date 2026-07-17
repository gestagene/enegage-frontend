import { useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createPost, createImagePost } from "@/services/posts";
import { useAuth } from "@/context/authContext";

export const PostType = {
  Text: "text",
  Image: "image",
  Link: "link",
} as const;

export type PostType = (typeof PostType)[keyof typeof PostType];

export function useSubmitPost() {
  const { isLoggedIn } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [postTitle, setPostTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const type = (searchParams.get("type") as PostType) ?? PostType.Text;

  function handleTypeChange(newType: PostType) {
    setSearchParams({ type: newType });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!isLoggedIn) {
        throw new Error("You must be logged in to post.");
      }
      if (type === PostType.Image) {
        if (!imageFile) {
          throw new Error("Please select an image");
        }
        const { post } = await createImagePost(postTitle, type, imageFile);
        navigate(`/comments/${post.id}`);
      } else {
        const body = type === PostType.Text ? textBody : linkUrl;
        const { post } = await createPost(postTitle, body, type);
        navigate(`/comments/${post.id}`);
      }
      setPostTitle("");
      setTextBody("");
      setLinkUrl("");
      setImageFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isDisabled =
    !postTitle ||
    (type === PostType.Text && !textBody) ||
    (type === PostType.Image && !imageFile) ||
    (type === PostType.Link && !linkUrl);

  return {
    type,
    postTitle,
    setPostTitle,
    textBody,
    setTextBody,
    imageFile,
    setImageFile,
    linkUrl,
    setLinkUrl,
    error,
    isSubmitting,
    isDisabled,
    fileInputRef,
    handleTypeChange,
    handleSubmit,
  };
}
