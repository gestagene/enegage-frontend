import { useParams } from "react-router-dom";
import { getPost } from "@/services/posts";
import type { Post } from "@/types/post";
import { useState, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ActionBar from "@/components/ui/ActionBar";
import CommentBox from "@/components/ui/CommentBox";

export default function Comments() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [_error, setError] = useState("");
  const navigate = useNavigate();
  const imageUrl = post?.media?.[0]?.media_url;

  useEffect(() => {
    if (!id) return;
    async function fetchPost() {
      try {
        setError("");
        const result = await getPost(id!);
        setPost(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-3 border-green-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="text-sm sm:text-xs flex gap-2 items-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 rounded-full py-1.5 px-1.5 lg:-ml-10 hover:brightness-90 hover:cursor-pointer"
        >
          <IoArrowBackSharp size={20} />
        </button>
        <span>{post?.users?.username ?? ""}</span>
        <span>{post?.users?.institute ?? ""}</span>
        <span>{new Date(post?.created_at ?? "").toLocaleDateString()}</span>
      </div>

      {/*Post Body */}
      <div className="mb-4">
        <h1 className="text-[1.4rem] font-bold">{post?.title ?? ""}</h1>
        {imageUrl && (
          <div className="relative w-full h-128 rounded-lg overflow-hidden my-1">
            <img
              src={imageUrl}
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-75"
            />
            <img
              src={imageUrl}
              alt={post?.title}
              className="relative w-full h-full object-contain"
            />
          </div>
        )}
        {post?.body || post?.link_url}
      </div>
      <ActionBar likes={post?.total_likes} />
      {/*Comment Box*/}
      <CommentBox />
    </div>
  );
}
