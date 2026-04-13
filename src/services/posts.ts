export async function createPost(
  title: string,
  body: string,
  post_type: string,
  user_id: string
) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, post_type, user_id }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function createImagePost(
  title: string,
  post_type: string,
  user_id: string,
  imageFile: File
) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("post_type", post_type);
  formData.append("user_id", user_id);
  formData.append("image", imageFile);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function getPosts() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.posts;
}
