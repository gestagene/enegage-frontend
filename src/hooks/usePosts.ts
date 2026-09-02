import { useState, useEffect } from "react";
import type { Post } from "@/types/post";
import { getPosts } from "@/services/posts";

export function usePosts(sort: "new" | "top" = "new") {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const data = await getPosts(sort);
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [sort]);

  function removePost(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }
  return {
    posts,
    removePost,
    isLoading,
    error,
  };
}
