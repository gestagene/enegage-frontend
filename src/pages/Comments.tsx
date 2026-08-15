import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getPost } from "@/services/posts";
import type { Post } from "@/types/post";
import { useState, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import ActionBar from "@/components/ui/ActionBar";
import CommentBox from "@/components/ui/CommentBox";
import { useVote } from "@/hooks/useVote";
import CommentCard from "@/components/CommentCard";
import { useFetch } from "@/hooks/useFetch";
import { getComments } from "@/services/comments";
import type { Comment } from "@/types/comment";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { votePost } from "@/services/votes";
export default function Comments() {
  const { id } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);

  if (!id) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <CommentsLoader
        id={id}
        onCommentPosted={() => setRefreshKey((k) => k + 1)}
      />
      <CommentSection postId={id} refreshKey={refreshKey} />
    </>
  );
}

function CommentsLoader({
  id,
  onCommentPosted,
}: {
  id: string;
  onCommentPosted: () => void;
}) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        setError("");
        const result = await getPost(id);
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

  if (error || !post) {
    return (
      <p className="text-red-500 text-center">{error || "Post not found"}</p>
    );
  }

  return <CommentsContent post={post} onCommentPosted={onCommentPosted} />;
}

function CommentsContent({
  post,
  onCommentPosted,
}: {
  post: Post;
  onCommentPosted: () => void;
}) {
  const navigate = useNavigate();
  const imageUrl = post.media?.[0]?.media_url;
  const { vote, voteScore, handleVote } = useVote(
    (vote) => votePost(post.id, vote),
    post.user_vote,
    post.vote_score,
  );

  return (
    <div className="px-4">
      <div className="text-sm sm:text-xs flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 rounded-full py-1.5 px-1.5 lg:-ml-10 hover:brightness-90 hover:cursor-pointer"
        >
          <IoArrowBackSharp size={20} />
        </button>
        <span className="mx-1"></span>
        <span className="after:content-['·'] after:mx-1">
          {post.users?.username ?? "Deleted User"}
        </span>
        <span>{formatRelativeTime(post.created_at)}</span>
      </div>

      <div className="mb-4">
        <h1 className="text-[1.4rem] font-bold">{post.title}</h1>
        {imageUrl && (
          <div className="relative w-full h-128 rounded-lg overflow-hidden my-1">
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
        )}
        {post.body || post.link_url}
      </div>
      <ActionBar
        variant="post"
        voteScore={voteScore}
        vote={vote}
        handleVote={handleVote}
      />
      <CommentBox postId={post.id} onCommentPosted={onCommentPosted} />
    </div>
  );
}

function CommentSection({
  postId,
  refreshKey,
}: {
  postId: string;
  refreshKey: number;
}) {
  const { data, isLoading, error } = useFetch<Comment[]>(
    () => getComments(postId),
    [postId, refreshKey],
  );
  const comments = data ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-3 border-green-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">
        {error || "Error loading comments"}
      </p>
    );
  }
  return (
    <div className="flex-col flex space-y-4 w-full px-4 pb-2">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
