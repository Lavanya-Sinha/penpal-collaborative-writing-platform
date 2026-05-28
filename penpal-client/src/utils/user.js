export const getUserByEmail = async (email) => {
  console.log("Fetching user from frontend with email:", email);
  const API = `http://localhost:8000/user/${email}`;
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
    console.error("Error fetching user:", error);
    return null;
  }
};

export const getPostsByUserEmail = async (email) => {
  const API = `http://localhost:8000/stories/user/${email}`;
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
    console.error("Error fetching user posts:", error);
    return null;
  }
};
