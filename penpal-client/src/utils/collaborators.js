export const getCollaboratorById = async (id) => {
  const API = `http://localhost:8000/collaborators/${id}`;
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
    console.error("Error fetching collaborators:", error);
    return null;
  }
};

export const addCollaborators = async (id, collaborators) => {
  const API = `http://localhost:8000/collaborators/${id}`;
  const token = sessionStorage.getItem("token");
  const response = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ collaborators }), // Send as array
  });

  if (response.ok) {
    return response.json();
  } else {
    const error = await response.json();
    console.error("Error adding collaborators:", error);
    return null;
  }
};

export const removeCollaborators = async (id) => {
  const API = `http://localhost:8000/collaborators/${id}`;
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
    console.error("Error removing collaborators:", error);
    return null;
  }
};
