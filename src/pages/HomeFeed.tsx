import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import PostCard from "@/components/ui/PostCard";
import type { Post } from "@/types/post.ts";
import { getPosts } from "@/services/posts";
import { useFetch } from "@/hooks/useFetch";
import FeedSkeleton from "@/components/ui/FeedSkeleton";
import { deletePost } from "@/services/posts";
import { useAuth } from "@/context/authContext";

export default function Home() {
  const { query } = useOutletContext<{ query: string }>();
  const [displayLimit, setDisplayLimit] = useState(10);
  const { data, isLoading, error } = useFetch<Post[]>(getPosts, []);
  const { userId, isLoggedIn } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setDisplayLimit((prev) => Math.min(prev + 10, filtered.length));
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filtered.length]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full flex-col">
        <FeedSkeleton />
        <div className="mt-6 w-8 h-8 border-3 border-green-900 border-t-transparent rounded-full animate-spin" />
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
  if (posts.length === 0)
    return (
      <p className="text-center text-md text-gray-600 sm:w-175 w-full">
        No posts found..
      </p>
    );
  return (
    <div className="flex-col flex justify-center items-center divide-y divide-gray-300">
      {filtered.slice(0, displayLimit).map((post) => {
        const isOwner = isLoggedIn && post.user_id === userId;
        return (
          <PostCard
            key={post.id}
            post={post}
            isOwner={isOwner}
            handleDelete={async () => {
              try {
                await deletePost(post.id);
                setPosts((prev) => prev.filter((p) => p.id !== post.id));
              } catch (error: any) {
                throw new Error(error.message);
              }
            }}
          />
        );
      })}
    </div>
  );
}
