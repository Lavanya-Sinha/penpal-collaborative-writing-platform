import { RiSendPlane2Fill } from "react-icons/ri";
import { Input } from "@fluentui/react-components";
import { createComment } from "../../utils/comments";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Comments({ id, setOpen }) {
  const [reply, setReply] = useState("");
  const currentUser = useSelector((state) => state.user.value);

  const handleCommentSubmission = async (e) => {
    e.preventDefault();
    if (!reply.trim()) {
      alert("Please enter a comment");
      return;
    }

    if (!currentUser) {
      alert("Please log in to comment");
      return;
    }

    const response = await createComment(
      id,
      currentUser.fullname,
      currentUser.email,
      reply
    );
    if (!response) {
      console.log("Error creating comment");
      return;
    }
    setReply("");
    setOpen(true);
  };
  return (
    <div className="comments">
      <Input
        className="commentInput"
        placeholder="Write a comment..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button onClick={handleCommentSubmission} className="commentButton">
        <RiSendPlane2Fill size={17} />
      </button>
    </div>
  );
}
