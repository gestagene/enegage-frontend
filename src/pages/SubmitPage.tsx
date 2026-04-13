import { useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { createPost, createImagePost } from "@/services/posts";
import supabase from "@/services/supabaseClient";

const PostType = {
  Text: "text",
  Image: "image",
  Link: "link",
} as const;

type PostType = (typeof PostType)[keyof typeof PostType];

export default function SubmitPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [postTitle, setPostTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const type = (searchParams.get("type") as PostType) ?? PostType.Text;

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleTypeChange(newType: PostType) {
    setSearchParams({ type: newType });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("You must be logged in to post");
      }
      if (type === PostType.Image) {
        if (!imageFile) {
          throw new Error("Please select an image");
        }
        const { post } = await createImagePost(
          postTitle,
          type,
          session.user.id,
          imageFile
        );
        navigate(`/posts/${post.id}`);
      } else {
        const body = type === PostType.Text ? textBody : linkUrl;
        const { post } = await createPost(
          postTitle,
          body,
          type,
          session.user.id
        );
        navigate(`/posts/${post.id}`);
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

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center overflow-x-hidden">
        <div className="container relative">
          <h1 className="font-bold text-2xl py-3">Create a post</h1>
          <div className="relative flex space-x-2 sm:w-150 text-sm ">
            <button
              onClick={() => {
                handleTypeChange(PostType.Text);
              }}
              className="submit-type"
            >
              Text
            </button>
            <button
              onClick={async () => {
                handleTypeChange(PostType.Image);
              }}
              className="submit-type"
            >
              Images & Video
            </button>
            <button
              onClick={async () => {
                handleTypeChange(PostType.Link);
              }}
              className="submit-type"
            >
              Link
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
          >
            <div className="submit-body-group bg-white">
              <input
                type="text"
                value={postTitle}
                required
                onChange={(e) => {
                  setPostTitle(e.target.value);
                }}
              />
              <label className="text-sm">Title</label>
            </div>
            <div className="submit-body-group">
              {type === PostType.Text && (
                <textarea
                  className=" placeholder:text-sm "
                  name="body-text"
                  placeholder="Body Text"
                  id="body-text"
                  cols={60}
                  rows={10}
                  value={textBody}
                  onChange={(e) => {
                    setTextBody(e.target.value);
                  }}
                ></textarea>
              )}
              {type === PostType.Image && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative flex flex-col justify-content items-center sm:w-160 py-25 border-dashed border-gray-200 border-2 rounded-lg hover:cursor-pointer"
                >
                  <span className="py-2">Drag and drop or upload media</span>
                  <MdOutlineFileUpload size={35} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  />
                </div>
              )}
              {type === PostType.Link && (
                <div className="submit-body-group bg-white">
                  <input
                    type="text"
                    value={linkUrl}
                    required
                    onChange={(e) => {
                      setLinkUrl(e.target.value);
                    }}
                  />
                  <label className="text-sm">Link URL</label>
                </div>
              )}
            </div>
            <div className="flex py-5 relative justify-center">
              <input
                type="submit"
                value="Submit"
                disabled={
                  !postTitle ||
                  (type === PostType.Text && !textBody) ||
                  (type === PostType.Image && !imageFile) ||
                  (type === PostType.Link && !linkUrl)
                }
                className="bg-green-900 text-white py-2 px-4 rounded-full hover:cursor-pointer hover:brightness-85 w-25 text-center disabled:opacity-75 duration-200"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
