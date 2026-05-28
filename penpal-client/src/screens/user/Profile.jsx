import { Button, Card } from "@fluentui/react-components";
import Navbar from "../../components/Navbar";
import "../../styles/screens/user/Profile.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getPostsByUserEmail, getUserByEmail } from "../../utils/user";
import colors from "../../constants/Colors";

export default function Profile() {
  const { userEmail } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  console.log("Fetching user from frontend with email:", userEmail);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserByEmail(userEmail);

      if (!response) {
        console.error("Failed to fetch user");
        return;
      }
      console.log("Fetched user:", response);
      setUser(response);
    };

    const fetchPosts = async () => {
      const response = await getPostsByUserEmail(userEmail);

      if (!response) {
        console.error("Failed to fetch posts");
        return;
      }
      console.log("Fetched posts:", response);
      setPosts(response);
    };

    fetchPosts();
    fetchUser();
  }, [userEmail]);

  if (!user) {
    return (
      <div
        className="postpage-root"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Navbar title="Loading..." />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.3rem",
            fontWeight: 600,
            color: colors.secondaryColor,
            textAlign: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          Loading user details...
        </div>
      </div>
    );
  }

  return (
    <div
      className="create-root"
      style={{ minHeight: "100vh", background: "#f8fafc" }}
    >
      <Navbar title="Profile" />
      <div className="profile-container">
        <Card className="profile-card">
          <div className="profile-picture-container">
            <img
              src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-women-cartoon-avatar-in-flat-style-png-image_6110776.png"
              alt={user.name}
              className="profile-avatar"
            />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user.fullname}</h2>
            <div className="profile-email">{user.email}</div>
          </div>
        </Card>
        <h3 className="profile-section-title">Stories by {user.fullname}</h3>
        <div className="profile-posts">
          {posts.length > 0 &&
            posts.map((post) => (
              <Card key={post.id} className="profile-post-card">
                <h4 className="profile-post-title">{post.title}</h4>
                <p
                  className="profile-post-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <a
                  className="profile-post-btn" href={`/story/${post.id}`}>
                <Button
                  size="medium"
                  style={{ padding: "1rem", marginBottom: "1rem" }}
                >
                  Go to post
                </Button>
                </a>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
