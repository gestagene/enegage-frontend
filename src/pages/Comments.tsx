import { useParams } from "react-router-dom";
import { getPost } from "@/services/posts";
import type { Post } from "@/types/post";
import { useState, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoChatbubbleOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { BsRepeat } from "react-icons/bs";
import { RiShareForwardFill } from "react-icons/ri";

export default function Comments() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const imageUrl = post?.media?.[0]?.media_url;

  useEffect(() => {
    if (!id) return;
    async function fetchPost() {
      try {
        setIsLoading(true);
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
        <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
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
        <span>{post?.users.username ?? ""}</span>
        <span>{post?.users.institute ?? ""}</span>
        <span>{new Date(post?.created_at ?? "").toLocaleDateString()}</span>
      </div>
      <h1 className="text-[1.4rem] font-bold">{post?.title ?? ""}</h1>
      {/*Post Body */}
      <div className="mb-4">
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

      <div className="flex space-x-3 items-center">
        <button className="flex space-x-1  justify-center items-center py-1 px-1 bg-gray-200 rounded-full w-15 text-xs ">
          <span>
            <AiOutlineLike size={20} />
          </span>
          <span>{post?.total_likes}</span>
        </button>
        <button className="flex space-x-1  justify-center items-center py-1.5 px-1.5 bg-gray-200 rounded-full text-black text-xs">
          <span>
            <IoChatbubbleOutline size={20} />
          </span>
        </button>
        <button className="flex space-x-1  justify-center items-center py-1.5 px-1.5 bg-gray-200 rounded-full ">
          <span>
            <BsRepeat size={21} />
          </span>
        </button>
        <button className="flex space-x-1  justify-center items-center py-1.5 px-1.5 bg-gray-200 rounded-full">
          <span>
            <RiShareForwardFill size={20} />
          </span>
          <span className="text-xs">Share</span>
        </button>
      </div>
    </div>
  );
}
