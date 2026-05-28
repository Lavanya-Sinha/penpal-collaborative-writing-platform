export const getCommentsById = async (id) => {
  const API = `http://localhost:8000/comments/${id}`;
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
    console.error("Error fetching comments:", error);
    return null;
  }
};

export const createComment = async (id, user_name, user_email, comment_content) => {
  const API = `http://localhost:8000/comments/${id}`;
  const token = sessionStorage.getItem("token");
  const response = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_name, user_email, comment_content }),
  });

  if (response.ok) {
    return response.json();
  } else {
    const error = await response.json();
    console.error("Error creating post:", error);
    return null;
  }
};

export const deleteComment = async (id) => {
  const API = `http://localhost:8000/comments/${id}`;
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
    console.error("Error deleting comment:", error);
    return null;
  }
};
