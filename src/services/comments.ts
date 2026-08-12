import { supabase } from "@/lib/supabaseClient";

export async function createComment(postId: string, content: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/comments/${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ content }),
    },
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function getComments(postId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/comments/${postId}`,
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.comments;
}
