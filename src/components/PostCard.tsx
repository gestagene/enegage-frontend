import { BsThreeDots } from "react-icons/bs";
import { BiUpvote } from "react-icons/bi";
import { IoChatbubbleOutline } from "react-icons/io5";
import type { Post } from "@/types/post.ts";

interface PostCardProps {
  post: Post;
}

function PostContent({ post }: { post: Post }) {
  if (post.post_type === "image") {
    return <img src={post.image_url} className="w-full rounded-lg" />;
  }
  if (post.post_type === "link") {
    return <a href={post.link_url}>{post.link_url}</a>;
  }
  return <p>{post.body}</p>;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <>
      <div className="relative sm:w-175 text-justify px-2 pb-2 hover:bg-gray-200/35 hover:cursor-pointer rounded-lg">
        <div className="flex justify-between items-center space-x-3 text-xs px-2 pb-2 pt-2 w-full">
          <div className="flex space-x-2 text-xs">
            <span>
              <img />
            </span>
            <span>{post.profiles.username}</span>
            <span>{post.profiles.institute}</span>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
          <div className="hover:cursor-pointer">
            <BsThreeDots size={15} />
          </div>
        </div>
        <div className="px-2 ">
          <span className="text-2xl font-medium">{post.title}</span>
        </div>
        <div className="px-2 py-1 text-sm w-full">
          <PostContent post={post} />
        </div>
        <div className="flex space-x-2 items-center">
          <div className="flex space-x-1  justify-center items-center py-1 px-1 bg-gray-200 rounded-full w-15 text-xs ">
            <span>
              <BiUpvote size={17} />
            </span>
            <span>{post.total_likes}</span>
          </div>
          <div className="flex space-x-1  justify-center items-center py-1 px-1 bg-gray-200 rounded-full w-8 text-xs text-black">
            <span>
              <IoChatbubbleOutline size={17} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
