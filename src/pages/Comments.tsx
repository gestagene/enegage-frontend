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
  const imageUrl = post.media?.[0]?.media_url;
  const { vote, voteScore, handleVote } = useVote(
    (vote) => votePost(post.id, vote),
    post.user_vote,
    post.vote_score,
  );

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
        {imageUrl && (
          <div className="relative w-full h-full justify-center pointer-events-auto flex items-center overflow-hidden rounded-2xl">
            <img
              src={imageUrl}
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover blur-xl scale-130 opacity-75"
            />
            <img
              src={imageUrl}
              alt={post.title}
              className="relative flex justify-center items-center max-w-1/2 max-h-full object-contain inset-0 "
            />
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

  // newest first, with no duplicates if the fetch also returned one of ours
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
