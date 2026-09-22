import { formatRelativeTime } from "@/lib/formatRelativeTime";
import type { Comment } from "@/types/comment";
import ActionBar from "./ui/ActionBar";
import { useVote } from "@/hooks/useVote";
import { voteComment } from "@/services/votes";

export interface CommentCardProps {
  comment: Comment;
}
export default function CommentCard({ comment }: CommentCardProps) {
  const { vote, voteScore, handleVote } = useVote(
    (vote) => voteComment(comment.id, vote),
    comment.user_vote,
    comment.vote_score,
  );

  return (
    <div>
      <div className="flex space-x-1 text-xs text-gray-500">
        <span className="font-bold after:content-['·'] after:ml-1">
          {comment.users?.username ?? "Deleted User"}
        </span>
        <span className="after:content-['·'] after:ml-1 after:font-bold">
          {formatRelativeTime(comment.created_at)}
        </span>
        <span>{/*edited true/false */}</span>
      </div>
      <div className="text-sm text-justify pt-1">{comment.content}</div>
      <ActionBar
        vote={vote}
        voteScore={voteScore}
        handleVote={handleVote}
        variant="comment"
      />
    </div>
  );
}
