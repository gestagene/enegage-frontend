import type { vote } from "./post";

export interface Comment {
  id: string;
  users: {
    username: string;
    institute: string | null;
  };
  vote_score: number;
  content: string;
  created_at: string;
  user_vote: vote | null;
}
