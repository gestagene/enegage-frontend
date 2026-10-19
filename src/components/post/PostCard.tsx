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
import { ChevronLeft, ChevronRight } from "lucide-react";
interface PostCardProps {
  post: Post;
  isOwner: boolean;
  handleDelete: () => void;
}

function PostContent({ post }: { post: Post }) {
  const [current, setCurrent] = useState(0);
  const mediaLength = post.media?.length ?? 0;

  const next = () => setCurrent((c) => (c + 1) % mediaLength);
  const prev = () => setCurrent((c) => (c - 1 + mediaLength) % mediaLength);
  if (mediaLength) {
    return (
      mediaLength > 0 && (
        <div className="relative my-3 aspect-video overflow-hidden rounded-2xl bg-neutral-800">
          {post.media?.map((media, i) => (
            <div
              key={media.media_url}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                i === current ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={media.media_url}
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover blur-xl scale-130 opacity-75"
              />
              <img
                src={media.media_url}
                alt={post.title}
                className="relative max-w-full max-h-full object-contain"
              />
            </div>
          ))}

          {mediaLength > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                type="button"
                aria-label="Previous image"
                className="absolute top-1/2 left-2 -translate-y-1/2 z-10 rounded-full bg-neutral-900/70 text-white size-9 flex items-center justify-center hover:bg-neutral-900 hover:cursor-pointer"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                type="button"
                aria-label="Next image"
                className="absolute top-1/2 right-2 -translate-y-1/2 z-10 rounded-full bg-neutral-900/70 text-white size-9 flex items-center justify-center hover:bg-neutral-900 hover:cursor-pointer"
              >
                <ChevronRight />
              </button>
              <div className="absolute bottom-2 left-1/2 z-10 flex gap-1.5 bg-neutral-900/80 p-1 rounded-full">
                {post.media?.map((_, i) => (
                  <span
                    className={`size-1.5 rounded-full ${i === current ? "bg-white" : "bg-white/40"}`}
                  ></span>
                ))}
              </div>
            </>
          )}
        </div>
      )
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
        onClick={(e) => {
          e.stopPropagation();
          navigate(postUrl);
        }}
        className="relative w-full text-justify px-2 hover:bg-gray-100/50 hover:cursor-pointer rounded-2xl my-1 "
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
        <div className="px-2 my-2 text-sm w-full rounded-2xl overflow-hidden max-h-128 line-clamp-6 text-justify">
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
