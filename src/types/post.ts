interface Media {
  media_url: string;
  media_type: string;
  uploaded_at: string;
}
export interface Post {
  id: string;
  title: string;
  body: string | null;
  vote_score: number;
  created_at: string;
  users: {
    username: string;
    institute: string | null;
  };
  media?: Media[];
  user_id?: string;
  user_vote: vote | null;
  comment_count?: number;
}

export type vote = "up" | "down";
