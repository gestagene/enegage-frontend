import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getPost } from "@/services/posts";
import type { Post } from "@/types/post";
import { useState, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import ActionBar from "@/components/ui/ActionBar";
import CommentBox from "@/components/comment/CommentBox";
import { useVote } from "@/hooks/useVote";
import CommentCard from "@/components/comment/CommentCard";
import { useFetch } from "@/hooks/useFetch";
import { getComments } from "@/services/comments";
import type { Comment } from "@/types/comment";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { votePost } from "@/services/votes";
import { useToast } from "@/context/toastContext";
import { RichTextContent } from "@/components/post/RichTextContent";
import Loading from "@/components/ui/Loading";

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
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchPost() {
      try {
        setError("");
        const result = await getPost(id);
        setPost(result);
      } catch (err: any) {
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
      <div className="text-sm sm:text-xs flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="fixed z-10 bg-gray-200 rounded-full py-1.5 px-1.5 lg:-ml-10 hover:brightness-90 hover:cursor-pointer"
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
        <RichTextContent content={post.body} />
      </div>
      <ActionBar
        variant="post"
        voteScore={voteScore}
        vote={vote}
        handleVote={handleVote}
        commentCount={post.comment_count}
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
    return <Loading size={32} />;
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">
        {error || "Something went wrong while loading the comments"}
      </p>
    );
  }
  return (
    <div className="flex-col flex space-y-4 px-4 pb-2">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
