export interface Post {
  id: number;
  title: string;
  body: string | null;
  post_type: "text" | "image" | "link";
  image_url: string;
  link_url: string;
  total_likes: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    institute: string | null;
  };
}
