import type { Media } from "../components/MediaGallery";

interface PostCardProps {
  title: string;
  body: string;
  total_likes: number;
  created_at: string;
  profiles: {
    username: string;
    institute: string;
  };
  media: Media[];
}

export default function PostCard({
  title,
  body,
  total_likes,
  created_at,
  profiles: { username, institute },
  media,
}: PostCardProps) {
  return <> </>;
}
