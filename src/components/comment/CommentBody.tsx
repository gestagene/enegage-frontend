import { formatRelativeTime } from "@/lib/formatRelativeTime";
import type { Comment } from "@/types/comment";
import ActionBar from "@/components/ui/ActionBar";
import { useVote } from "@/hooks/useVote";
import { voteComment } from "@/services/votes";

export interface CommentBodyProps {
  comment: Comment;
  onReply: () => void;
}

export default function CommentBody({ comment, onReply }: CommentBodyProps) {
  const { vote, voteScore, handleVote } = useVote(
    (vote) => voteComment(comment.id, vote),
    comment.user_vote,
    comment.vote_score,
  );

  return (
    <div className="min-w-0 text-xs">
      <div className="flex items-center gap-1 px-1">
        <span className="font-semibold after:ml-1 after:content-['·']">
          {comment.users?.username ?? "Deleted User"}
        </span>
        <span>{formatRelativeTime(comment.created_at)}</span>
      </div>

      <div className="p-1 text-[13px] font-medium wrap-break-word">
        {comment.content}
      </div>

      <ActionBar
        vote={vote}
        voteScore={voteScore}
        handleVote={handleVote}
        onReply={onReply}
        variant="comment"
      />
    </div>
  );
}
