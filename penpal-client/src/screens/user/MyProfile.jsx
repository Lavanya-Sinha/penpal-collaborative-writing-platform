import { Button, Card } from "@fluentui/react-components";
import Navbar from "../../components/Navbar";
import "../../styles/screens/user/Profile.css";
import { useEffect, useState } from "react";
import { getPostsByUserEmail } from "../../utils/user";
import { getCurrentUser } from "../../utils/auth";
import FAB from "../../components/ui/FAB";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        console.log("User is logged in:", user);
        setUser(user);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user || !user.email) return;
    const fetchPosts = async () => {
      setPostsLoading(true);
      const response = await getPostsByUserEmail(user.email);
      if (!response) {
        console.error("Failed to fetch posts");
        setPosts([]);
        setPostsLoading(false);
        return;
      }
      console.log("Fetched posts:", response);
      setPosts(response);
      setPostsLoading(false);
    };

    fetchPosts();
  }, [user]);

  if (!user) {
    return (
      <div className="postpage-root loading-root">
        <Navbar title="Loading..." />
        <div className="profile-loading-message">Loading user details...</div>
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
          <img
            src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-women-cartoon-avatar-in-flat-style-png-image_6110776.png"
            alt={user.fullname || user.email || "User"}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h2 className="profile-name">{user.fullname || "No Name"}</h2>
            <div className="profile-email">{user.email || "No Email"}</div>
          </div>
        </Card>
        <h3 className="profile-section-title">Stories by you</h3>
        <div className="profile-posts">
          {postsLoading ? (
            <div className="profile-loading-message">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="profile-empty-message">
              <div className="profile-empty-emoji">(⁠╥⁠﹏⁠╥⁠)</div>
              <div className="profile-empty-text">
                You haven't created any stories yet.
              </div>
              <div className="profile-empty-subtext">
                Create your first story now!
              </div>
            </div>
          ) : (
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
            ))
          )}
        </div>
        <FAB />
      </div>
    </div>
  );
}
