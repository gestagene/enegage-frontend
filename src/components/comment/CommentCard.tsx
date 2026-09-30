import { formatRelativeTime } from "@/lib/formatRelativeTime";
import type { Comment } from "@/types/comment";
import ActionBar from "@/components/ui/ActionBar";
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
    <>
      <div className="relative flex m-0 gap-2 min-w-0 w-full">
        <div className="shrink-0">
          <img
            className="size-7 rounded-full object-contain"
            src={comment.users.avatar_url}
          />
        </div>

        <div className="flex flex-col min-w-0 flex-1 text-xs">
          {/* User Info */}
          <div className="flex items-center px-1 gap-1">
            <span className="font-semibold after:content-['·'] after:ml-1">
              {comment.users?.username ?? "Deleted User"}
            </span>

            <span>{formatRelativeTime(comment.created_at)}</span>

            <span>{/* edited true/false */}</span>
          </div>

          {/* Content */}
          <div className="p-1 text-[13px] font-medium text-justify wrap-break-word">
            {comment.content}
          </div>
        </div>
      </div>

      <ActionBar
        vote={vote}
        voteScore={voteScore}
        handleVote={handleVote}
        variant="comment"
      />
    </>
  );
}
