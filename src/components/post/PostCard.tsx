import { BsThreeDots } from "react-icons/bs";
import type { Post } from "@/types/post.ts";
import { useNavigate } from "react-router-dom";
import { toSlug } from "@/lib/slugify";
import ActionBar from "@/components/ui/ActionBar";
import { useVote } from "@/hooks/useVote";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { votePost } from "@/services/votes";
import PostCardMenu from "@/components/post//PostCardMenu";
import { useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { RichTextContent } from "@/components/post/RichTextContent";
interface PostCardProps {
  post: Post;
  isOwner: boolean;
  handleDelete: () => void;
}

function PostContent({ post }: { post: Post }) {
  const imageUrl = post.media?.[0]?.media_url;
  if (imageUrl) {
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
  if (post.body) {
    return <RichTextContent content={post.body} />;
  }
}

export default function PostCard({
  post,
  handleDelete,
  isOwner,
}: PostCardProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useClickOutside<HTMLDivElement>(
    () => setIsMenuOpen(false),
    isMenuOpen,
  );

  const { vote, voteScore, handleVote } = useVote(
    (vote) => votePost(post.id, vote),
    post.user_vote,
    post.vote_score,
  );
  const postUrl = `/comments/${post.id}/${toSlug(post.title)}`;
  return (
    <div className="w-full overflow-hidden">
      <div
        onClick={() => navigate(postUrl)}
        className="relative w-full text-justify px-2 pb-2 hover:bg-gray-100/50 hover:cursor-pointer rounded-2xl "
      >
        <div className="relative flex justify-between items-center text-xs px-2 pb-2 pt-2 w-full ">
          <div className="flex text-xs items-center gap-2">
            <img
              className="shrink-0 max-w-8 rounded-full object-contain"
              src={post.users.avatar_url}
            />

            <span className="after:content-['·'] after:mx-1">
              {post.users?.username ?? "Deleted User"}
            </span>
            <span>{formatRelativeTime(post.created_at)}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
            className="hover:cursor-pointer px-1.5 py-1.5 hover:bg-gray-200 rounded-full "
          >
            <BsThreeDots size={15} />
          </button>
        </div>
        {isMenuOpen && (
          <PostCardMenu
            menuRef={menuRef}
            isOwner={isOwner}
            handleDelete={handleDelete}
          />
        )}
        <div className="px-2">
          <span className="text-md font-bold">{post.title}</span>
        </div>
        <div className="px-2 my-2 text-sm w-full rounded-2xl overflow-hidden max-h-128 line-clamp-6 text-justify  ">
          <PostContent post={post} />
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <ActionBar
            voteScore={voteScore}
            vote={vote}
            handleVote={handleVote}
            variant={"post"}
            commentCount={post.comment_count}
            handleNavigate={() => navigate(postUrl)}
          />
        </div>
      </div>
    </div>
  );
}
