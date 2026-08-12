import { supabase } from "@/lib/supabaseClient";
import type { vote } from "@/types/post";

export async function votePost(postId: string, voteType: vote) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/votes/${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        vote_type: voteType,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
