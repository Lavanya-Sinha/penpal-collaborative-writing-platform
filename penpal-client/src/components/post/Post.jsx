import { Card } from "@fluentui/react-components";
import "../../styles/components/post/Post.css";
import AuthorInfo from "./AuthorInfo";
import Comments from "./Comments";

export default function Post({ id, title, content, author, setOpen }) {
  // Handler to prevent navigation when clicking inside the comments
  const handleCommentsClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <a href={`/story/${id}`} className="postLink">
      <Card className="post">
        <AuthorInfo
          author={{
            name: author,
            profilePicture: "/assets/account.png",
            profileUrl: `/user/${author}`,
          }}
        />
        <div className="postContentContainer">
          <h2 className="postTitle">{title}</h2>
          <p
            className="postContent"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div onClick={handleCommentsClick} style={{ cursor: "auto" }}>
          <Comments id={id} setOpen={setOpen} />
        </div>
      </Card>
    </a>
  );
}
