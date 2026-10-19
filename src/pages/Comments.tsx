import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getPost } from "@/services/posts";
import type { Post } from "@/types/post";
import { useState, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import ActionBar from "@/components/ui/ActionBar";
import CommentForm from "@/components/comment/CommentForm";
import CommentItem from "@/components/comment/CommentItem";
import { useVote } from "@/hooks/useVote";
import { useFetch } from "@/hooks/useFetch";
import { getComments, createComment } from "@/services/comments";
import type { Comment } from "@/types/comment";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { votePost } from "@/services/votes";
import { useToast } from "@/context/toastContext";
import { RichTextContent } from "@/components/post/RichTextContent";
import Loading from "@/components/ui/Loading";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function Comments() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <CommentsLoader id={id} />
      {/* key resets the locally added comments when navigating to another post */}
      <CommentSection key={id} postId={id} />
    </>
  );
}

function CommentsLoader({ id }: { id: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchPost() {
      try {
        setError("");
        const result = await getPost(id);
        setPost(result);
      } catch (err: any) {
        setError(err.message);
        showToast(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading size={32} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <p className="text-red-500 text-center">
        {error || "Something went wrong while loading this post"}
      </p>
    );
  }

  return <CommentsContent post={post} />;
}

function CommentsContent({ post }: { post: Post }) {
  const navigate = useNavigate();
  const { vote, voteScore, handleVote } = useVote(
    (vote) => votePost(post.id, vote),
    post.user_vote,
    post.vote_score,
  );
  const [current, setCurrent] = useState(0);
  const mediaLength = post.media?.length ?? 0;

  const next = () => setCurrent((c) => (c + 1) % mediaLength);
  const prev = () => setCurrent((c) => (c - 1 + mediaLength) % mediaLength);

  return (
    <div className="px-4">
      <div className="text-sm sm:text-xs flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="hidden lg:flex z-1 bg-gray-200 rounded-full py-1.5 px-1.5 lg:-ml-10 hover:brightness-90 hover:cursor-pointer"
        >
          <IoArrowBackSharp size={20} />
        </button>
        <span>
          <img
            className="shrink-0 max-w-8 rounded-full object-contain"
            src={post.users.avatar_url}
          />
        </span>
        <span className="after:content-['·'] after:mx-1">
          {post.users?.username ?? "Deleted User"}
        </span>
        <span>{formatRelativeTime(post.created_at)}</span>
      </div>

      <div className="mb-4">
        <h1 className="text-[1.4rem] font-bold">{post.title}</h1>

        {mediaLength > 0 && (
          <div className="relative my-3 aspect-video overflow-hidden rounded-2xl bg-neutral-800">
            {post.media?.map((media, i) => (
              <div
                key={media.media_url}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                  i === current
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
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
                  onClick={prev}
                  type="button"
                  aria-label="Previous image"
                  className="absolute top-1/2 left-2 -translate-y-1/2 z-10 rounded-full bg-neutral-900/70 text-white size-9 flex items-center justify-center hover:bg-neutral-900 hover:cursor-pointer"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={next}
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
        )}

        <RichTextContent content={post.body} />
      </div>
      <ActionBar
        variant="post"
        voteScore={voteScore}
        vote={vote}
        handleVote={handleVote}
        commentCount={post.comment_count}
      />
    </div>
  );
}

function CommentSection({ postId }: { postId: string }) {
  // comments posted in this session, shown instantly without refetching the list
  const [newComments, setNewComments] = useState<Comment[]>([]);

  const { data, isLoading, error } = useFetch<Comment[]>(
    () => getComments(postId),
    [postId],
  );

  const handleCreate = async (content: string) => {
    const created = await createComment(postId, content);
    setNewComments((prev) => [created, ...prev]);
  };

  // newest first and no duplicates
  const newIds = new Set(newComments.map((c) => c.id));
  const comments = [
    ...newComments,
    ...(data ?? []).filter((c) => !newIds.has(c.id)),
  ];

  return (
    <div className="px-4 pb-2">
      <CommentForm onSubmit={handleCreate} />

      {isLoading ? (
        <Loading size={32} />
      ) : error ? (
        <p className="text-red-500 text-center">
          {error || "Something went wrong while loading the comments"}
        </p>
      ) : comments.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          No comments yet. Start the conversation.
        </p>
      ) : (
        <div className="flex flex-col space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
}
