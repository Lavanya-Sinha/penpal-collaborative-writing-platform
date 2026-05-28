import { Card, Button, Input } from "@fluentui/react-components";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import "../../styles/screens/post/Post.css";
import colors from "../../constants/Colors";
import { useParams } from "react-router";
import { getPostById } from "../../utils/post";
import {
  createComment,
  deleteComment,
  getCommentsById,
} from "../../utils/comments";
import { useSelector } from "react-redux";
import { getCollaboratorById } from "../../utils/collaborators";

export default function Story() {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");

  const currentUser = useSelector((state) => state.user.value);

  console.log("Fetching story from frontend with ID:", storyId);

  const handleReply = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      setComments([...comments, { id: Date.now(), user: "You", text: reply }]);
      setReply("");
    }
  };

  const handleCommentSubmission = async (e) => {
    e.preventDefault();
    if (!reply.trim()) {
      alert("Please enter a comment");
      return;
    }

    const response = await createComment(
      storyId,
      currentUser.fullname,
      currentUser.email,
      reply
    );
    if (!response) {
      console.log("Error creating comment");
      return;
    }

    setComments([
      ...comments,
      { id: Date.now(), user: currentUser, text: reply },
    ]);
    setReply("");

    if (!response) {
      console.log("Error creating post");
      return;
    }
    window.location.reload();
  };

  useEffect(() => {
    const fetchStories = async () => {
      const response = await getPostById(storyId);

      if (!response) {
        console.error("Failed to fetch stories");
        return;
      }
      console.log("Fetched stories:", response);
      setStory(response);
    };

    const fetchComments = async () => {
      const response = await getCommentsById(storyId);
      console.log("Fetched comments from the client:", response);

      if (!response) {
        console.error("Failed to fetch comments");
        return;
      }
      console.log("Fetched comments:", response);
      setComments(response);
    };

    const fetchCollaborators = async () => {
      const response = await getCollaboratorById(storyId);
      console.log("Fetched collaborators from the client:", response);

      if (!response) {
        console.error("Failed to fetch collaborators");
        return;
      }
      console.log("Fetched collaborators:", response);
      if (response.length === 0) {
        return;
      }
      response.forEach((collab) => {
        setCollaborators((prev) => {
          const newList = new Set([...prev, collab.email]);
          return Array.from(newList);
        });
      });
    };

    fetchComments();
    fetchStories();
    fetchCollaborators();
  }, [storyId]);

  if (!story) {
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
          Loading story...
        </div>
      </div>
    );
  }

  return (
    <div className="postpage-root">
      <Navbar title={`Post by ${story.author}`} />
      <div className="postpage-container">
        <Card className="postpage-card">
          <div className="postpage-header">
            <img
              src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-women-cartoon-avatar-in-flat-style-png-image_6110776.png"
              alt={story.author}
              className="postpage-avatar"
            />
            <span className="postpage-author">{story.author}</span>
            <Button
              as="a"
              href={`/user/${story.author}`}
              appearance="secondary"
              size="small"
              className="postpage-profilebtn"
            >
              Go to profile
            </Button>
            {currentUser &&
              (collaborators.includes(currentUser.email) ||
                currentUser.email === story.author) && (
                <Button
                  as="a"
                  href={`/edit/${storyId}`}
                  appearance="primary"
                  size="small"
                  className="postpage-editbtn"
                >
                  Edit Story
                </Button>
              )}
          </div>
          <h1 className="postpage-title">{story.title}</h1>
          <div
            className="postpage-content"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </Card>

        {collaborators.length > 0 && (
          <Card className="postpage-collaborators-card">
            <div className="postpage-collaborators-title">Collaborators</div>
            <div className="postpage-collaborators-list">
              {collaborators.map((collab) => (
                <div key={collab} className="postpage-collaborator">
                  <span className="postpage-collaborator-name">⦿ {collab}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {comments.length > 0 && (
          <Card className="postpage-comments-card">
            <div className="postpage-comments-title">Comments</div>
            <div className="postpage-comments-list">
              {comments.map((c) => (
                <div key={c.id} className="postpage-comment">
                  <div className="postpage-comment-content">
                    <span className="postpage-comment-user">{c.user_name}</span>
                    <span className="postpage-comment-text">
                      {c.comment_content}
                    </span>
                  </div>
                  {currentUser && c.user_email === currentUser.email && (
                    <Button
                      appearance="secondary"
                      size="medium"
                      className="postpage-deletebtn"
                      onClick={() => {
                        deleteComment(c.id);
                        window.location.reload();
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}
        {currentUser && (
          <form className="postpage-replyform" onSubmit={handleReply}>
            <Input
              placeholder="Write a comment..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              size="large"
              appearance="outline"
              required
              className="postpage-replyinput"
            />
            <Button
              type="submit"
              appearance="primary"
              className="postpage-replybtn"
              onClick={handleCommentSubmission}
              style={{
                backgroundColor: colors.secondaryColor,
                color: "#fff",
              }}
            >
              Reply
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
