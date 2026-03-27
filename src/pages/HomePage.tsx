import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";
import type { Media } from "@/components/MediaGallery";

interface Post {
  id: number;
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
export default function Home() {
  const { query } = useOutletContext<{ query: string }>();
  const [displayLimit, setDisplayLimit] = useState(10);
  const [posts, setPosts] = useState<Post[]>([]);

  const filtered = "";

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setDisplayLimit((prev) => Math.min(prev + 10, filtered.length));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filtered.length]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="py-8">
          {
          posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              body={post.body}
              total_likes={post.total_likes}
              created_at={post.created_at}
              profiles={post.profiles}
              media={post.media}
            />
          ))}
        </div>
      </div>
    </>
  );
}
