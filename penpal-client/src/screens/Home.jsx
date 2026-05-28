import "../styles/screens/Home.css";
import colors from "../constants/Colors";
import Post from "../components/post/Post";
import FAB from "../components/ui/FAB";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getPosts } from "../utils/post";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";
import { useSelector } from "react-redux";

export default function Home() {
  const [response, setResponse] = useState([]);
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.value);

  useEffect(() => {
    const fetchStories = async () => {
      const response = await getPosts();

      if (!response) {
        console.error("Failed to fetch stories");
        return;
      }
      console.log("Fetched stories:", response);
      setResponse(response);
    };

    fetchStories();
  }, []);
  return (
    <div className="root" style={{ backgroundColor: colors.secondaryColor }}>
      <Header />
      <div className="home">
        {response.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            setOpen={setOpen}
          />
        ))}
      </div>

      <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Commenting on stories</DialogTitle>
            <DialogContent>Comment added successfully!</DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  appearance="primary"
                  style={{ backgroundColor: "#c95792", color: "#fff" }}
                >
                  OK
                </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      {currentUser && <FAB onClick={() => console.log("FAB clicked")} />}
    </div>
  );
}
