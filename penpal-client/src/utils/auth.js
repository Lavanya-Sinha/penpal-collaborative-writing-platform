export const register = async (fullname, email, password) => {
  const res = await fetch("http://localhost:8000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname, email, password }),
  });
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.status !== 200) {
    return { error: "Invalid credentials, please try again" };
  }

  if (data.token) {
    sessionStorage.setItem("token", data.token); // persists session
  }
  return data;
};

export const getCurrentUser = async () => {
  const token = sessionStorage.getItem("token");

  if (!token) return null;

  try {
    const res = await fetch("http://localhost:8000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      sessionStorage.removeItem("token"); // Optional: cleanup if token invalid
      return null;
    }

    const user = await res.json();
    return user;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
};

export const signout = () => {
  sessionStorage.removeItem("token");
  window.location.href = "/login";
};
