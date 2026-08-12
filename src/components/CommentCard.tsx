import { formatRelativeTime } from "@/lib/formatRelativeTime";
import type { Comment } from "@/types/comment";

interface CommentCardProps {
  comment: Comment;
}
export default function CommentCard({ comment }: CommentCardProps) {
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
      <div>{comment.content}</div>
    </div>
  );
}
