import { Button } from "@fluentui/react-components";

export default function AuthorInfo({ author }) {
  return (
    <div className="authorInfo">
      <div className="authorInfoContainer">
        <img
          className="authorPicture"
          src={author.profilePicture}
          alt={`${author.name}'s profile`}
        />
        <div className="authorDetails">
          <h4 className="authorName">{author.name}</h4>
        </div>
      </div>
      <div className="authorActionsContainer">
        <a href={author.profileUrl}>
          <Button>Go to profile</Button>
        </a>
      </div>
    </div>
  );
}
