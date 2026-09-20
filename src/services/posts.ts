import { supabase } from "@/lib/supabaseClient";
import type { JSONContent } from "@tiptap/react";

export async function createPost(
  title: string,
  body?: JSONContent,
  imageFiles?: File[],
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const formData = new FormData();

  formData.append("title", title);
  formData.append("body", JSON.stringify(body));
  if (imageFiles) {
    imageFiles.forEach((imageFile) => formData.append("imageFiles", imageFile));
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getPosts(sort: "new" | "top" = "new") {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/posts?sort=${sort}`,
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data; // backend returns a bare array
}

export async function getPost(id: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/posts/${id}`,
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.post;
}

export async function deletePost(id: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/posts/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    },
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.message;
}
