import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";
import type { Post } from "@/types/post.ts";
import { getPosts } from "@/services/posts";
import { useFetch } from "@/hooks/useFetch";

export default function Home() {
  const { query } = useOutletContext<{ query: string }>();
  const [displayLimit, setDisplayLimit] = useState(10);

  const { data, isLoading, error } = useFetch<Post[]>(getPosts, []);
  const posts = data ?? [];

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
    return (
      <div>
        <p className="text-red-500 text-md text-center w-full">{error}</p>
      </div>
    );
  }
  if (!posts || posts.length === 0)
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
