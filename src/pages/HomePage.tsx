import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";
import type { Post } from "@/components/PostCard";
import { getPosts } from "@/services/posts";

export default function Home() {
  const { query } = useOutletContext<{ query: string }>();
  const [displayLimit, setDisplayLimit] = useState(10);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

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

  if (isLoading) {
    return (
      <div className="text-center text-md text-gray-600 w-full">Loading...</div>
    );
  }
  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }
  if (posts.length === 0)
    return (
      <p className="text-center text-md text-gray-600 w-full">
        No posts found..
      </p>
    );
  return (
    <>
      <div className="flex flex-col divide-y divide-gray-200 space-y-1">
        {filtered.slice(0, displayLimit).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
