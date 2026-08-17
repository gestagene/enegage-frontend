interface Media {
  media_url: string;
  media_type: string;
  uploaded_at: string;
}
export interface Post {
  id: string;
  title: string;
  body: string | null;
  post_type: "text" | "image" | "link";
  link_url: string;
  vote_score: number;
  created_at: string;
  users: {
    username: string;
    institute: string | null;
  };
  media: Media[];
  user_vote: vote | null;
  comment_count?: number;
}

export type vote = "up" | "down";
