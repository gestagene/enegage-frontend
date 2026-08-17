import { BsThreeDots } from "react-icons/bs";
import type { Post } from "@/types/post.ts";
import { useNavigate } from "react-router-dom";
import { toSlug } from "@/lib/slugify";
import ActionBar from "./ActionBar";
import { useVote } from "@/hooks/useVote";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { votePost } from "@/services/votes";
interface PostCardProps {
  post: Post;
}

function PostContent({ post }: { post: Post }) {
  if (post.post_type === "image") {
    const imageUrl = post.media?.[0]?.media_url;
    if (!imageUrl) return null;
    return (
      <div className="relative w-full h-128 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-75"
        />
        <img
          src={imageUrl}
          alt={post.title}
          className="relative w-full h-full object-contain"
        />
      </div>
    );
  }
  if (post.post_type === "link") {
    return <a href={post.link_url}>{post.link_url}</a>;
  }
  return <p>{post.body}</p>;
}

export default function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
  const { vote, voteScore, handleVote } = useVote(
    (vote) => votePost(post.id, vote),
    post.user_vote,
    post.vote_score,
  );
  return (
    <div className="w-full">
      <div
        onClick={() => navigate(`/comments/${post.id}/${toSlug(post.title)}`)}
        className="relative w-full text-justify px-2 pb-2 hover:bg-gray-200/40 hover:cursor-pointer rounded-2xl "
      >
        <div className="flex justify-between items-center space-x-3 text-xs px-2 pb-2 pt-2 w-full ">
          <div className="flex text-xs">
            <span className="mx-1">
              <img />
            </span>
            <span className="after:content-['·'] after:mx-1">
              {post.users?.username ?? "Deleted User"}
            </span>
            <span>{formatRelativeTime(post.created_at)}</span>
          </div>
          <button className="hover:cursor-pointer">
            <BsThreeDots size={15} />
          </button>
        </div>
        <div className="px-2">
          <span className="text-md font-medium">{post.title}</span>
        </div>
        <div className="px-2 my-2 text-sm w-full rounded-2xl">
          <PostContent post={post} />
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <ActionBar
            voteScore={voteScore}
            vote={vote}
            handleVote={handleVote}
            variant={"post"}
            commentCount={post.comment_count}
          />
        </div>
      </div>
    </div>
  );
}
