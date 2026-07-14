import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import PostCard from "@/components/ui/PostCard";
import type { Post } from "@/types/post.ts";
import { getPosts } from "@/services/posts";
import { useFetch } from "@/hooks/useFetch";
import FeedSkeleton from "@/components/ui/FeedSkeleton";

export default function Home() {
  const { query } = useOutletContext<{ query: string }>();
  const [displayLimit, setDisplayLimit] = useState(10);
  const { data, isLoading, error } = useFetch<Post[]>(getPosts, []);
  const posts = data ?? [];

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()),
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
      <div className="flex items-center justify-center w-full flex-col">
        <FeedSkeleton />
      </div>
    );
  }
  if (error) {
    return (
      <div className="justify-center items-center ">
        <p className="text-red-500 text-md text-center w-full">{error}</p>
      </div>
    );
  }
  if (!posts || posts.length === 0)
    return (
      <p className="text-center text-md text-gray-600 sm:w-175 w-full">
        No posts found..
      </p>
    );
  return (
    <div className="flex-col flex justify-center items-center divide-y divide-gray-300">
      {filtered.slice(0, displayLimit).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
