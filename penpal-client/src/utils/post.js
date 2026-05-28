export const createPost = async (title, content, author) => {
  const API = "http://localhost:8000/stories";
  const token = sessionStorage.getItem("token");
  const response = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, author }),
  });

  if (response.ok) {
    return response.json();
  } else {
    const error = await response.json();
    console.error("Error creating post:", error);
    return null;
  }
};

export const getPosts = async () => {
  const API = "http://localhost:8000/stories";
  const token = sessionStorage.getItem("token");
  const response = await fetch(API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    const error = await response.json();
    console.error("Error fetching posts:", error);
    return null;
  }
};

export const getPostById = async (id) => {
  const API = `http://localhost:8000/stories/${id}`;
  const token = sessionStorage.getItem("token");
  const response = await fetch(API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    const error = await response.json();
    console.error("Error fetching post:", error);
    return null;
  }
};

export const updatePost = async (id, title, content) => {
  const API = `http://localhost:8000/stories/${id}`;
  const token = sessionStorage.getItem("token");
  const response = await fetch(API, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (response.ok) {
    return response.json();
  } else {
    const error = await response.json();
    console.error("Error updating post:", error);
    return null;
  }
};

export const deletePost = async (id) => {
  const API = `http://localhost:8000/stories/${id}`;
  const token = sessionStorage.getItem("token");
  const response = await fetch(API, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    const error = await response.json();
    console.error("Error deleting post:", error);
    return null;
  }
};
