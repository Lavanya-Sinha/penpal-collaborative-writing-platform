import Navbar from "../../components/Navbar";
import {
  Input,
  Button,
  useRestoreFocusSource,
  OverlayDrawer,
} from "@fluentui/react-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import "../../styles/screens/post/Create.css";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from "@fluentui/react-components";

import { createPost } from "../../utils/post";
import { BsPlus } from "react-icons/bs";
import { CgCheck, CgClose, CgRemove } from "react-icons/cg";
import { addCollaborators } from "../../utils/collaborators";

export default function Create() {
  const currentUser = useSelector((state) => state.user.value);
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [collaboratorsDialog, setCollaboratorsDialog] = useState(false);
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const [collaborators, setCollaborators] = useState([]);

  const handleAddCollaborator = (e) => {
    e.preventDefault();
    const email = collaboratorEmail.trim();
    if (!email || collaborators.includes(email)) return;
    setCollaborators([...collaborators, email]);
    setCollaboratorEmail("");
  };

  const handleConfirmCollaborators = () => {
    if (collaborators.length === 0) {
      alert("Please add at least one collaborator");
      return;
    }
    setIsOpen(false);
    setCollaboratorsDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      alert("Please fill in all fields");
      return;
    }

    const response = await createPost(
      form.title,
      form.content,
      currentUser.email
    );

    if (collaborators.length > 0) {
      const collaboratorResponse = await addCollaborators(
        response.id,
        collaborators
      );

      if (!collaboratorResponse) {
        console.log("Error adding collaborators");
        return;
      }
    }

    if (!response) {
      console.log("Error creating post");
      return;
    }
    setOpen(true);
    setForm({ title: "", content: "", author: currentUser.email });
  };

  const [open, setOpen] = useState(false);
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className="create-root">
      <Navbar title="Create a New Story" />
      <div className="create">
        <form className="create-form" onSubmit={handleSubmit}>
          <h1 className="create-title">Create a New Story</h1>
          <Input
            className="create-input"
            type="text"
            name="title"
            placeholder="Story Title"
            required
            appearance="outline"
            size="large"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <div className="quill-label">Story Content</div>
          <ReactQuill
            className="create-quill"
            theme="snow"
            value={form.content}
            onChange={(value) => setForm({ ...form, content: value })}
            placeholder="Write your story here..."
            style={{ minHeight: 220, background: "#fff", borderRadius: 10 }}
          />
          <div className="collaborator-outer-list">
            <div className="collaborator-title">Collaborators</div>
            {collaborators.length === 0 ? (
              <div className="collaborator-empty">
                No collaborators added yet.
              </div>
            ) : (
              collaborators.map((email) => (
                <div key={email} className="collaborator-item">
                  ⦿ {email}
                </div>
              ))
            )}
          </div>
          <div className="button-container">
            <Button
              onClick={() => setIsOpen(true)}
              appearance="secondary"
              size="large"
              className="create-btn"
            >
              <BsPlus size={26} style={{ marginRight: 4 }} />
              Add collaborators
            </Button>
            <Button
              appearance="primary"
              type="submit"
              size="large"
              className="create-btn"
              style={{ backgroundColor: "#c95792", color: "#fff" }}
            >
              Publish Story
            </Button>
          </div>
        </form>

        <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Posting a new story</DialogTitle>
              <DialogContent>Story uploaded successfully!</DialogContent>
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

        <Dialog
          open={collaboratorsDialog}
          onOpenChange={(event, data) => setCollaboratorsDialog(data.open)}
        >
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Adding collaborators</DialogTitle>
              <DialogContent>Collaborators added successfully!</DialogContent>
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

        <OverlayDrawer
          {...restoreFocusSourceAttributes}
          type="overlay"
          separator
          open={isOpen}
          onOpenChange={(_, { open }) => setIsOpen(open)}
          position="end"
        >
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<CgClose />}
                  onClick={() => setIsOpen(false)}
                />
              }
            >
              <p className="drawer-subtitle">Add collaborators</p>
            </DrawerHeaderTitle>
          </DrawerHeader>

          <DrawerBody>
            <form className="collaborator-input-group">
              <Input
                required
                type="email"
                placeholder="Enter collaborator's email"
                value={collaboratorEmail}
                onChange={(e) => setCollaboratorEmail(e.target.value)}
                className="collaborator-input"
                appearance="outline"
                size="large"
                style={{ width: "100%" }}
              />
              <Button
                appearance="secondary"
                onClick={handleAddCollaborator}
                className="collaborator-add-btn"
                style={{
                  width: "100%",
                }}
                type="submit"
              >
                <BsPlus size={26} style={{ marginRight: 4 }} />
                Add
              </Button>
            </form>
            <div className="collaborator-list">
              {collaborators.length === 0 ? (
                <div className="collaborator-empty">
                  No collaborators added yet.
                </div>
              ) : (
                collaborators.map((email) => (
                  <div key={email} className="collaborator-item">
                    ⦿ {email}
                  </div>
                ))
              )}
            </div>
            <Button
              appearance="secondary"
              onClick={() => {
                setCollaborators([]);
              }}
              className="collaborator-add-btn"
              style={{
                width: "100%",
                marginBottom: "1rem",
              }}
              type="submit"
            >
              <CgRemove size={18} style={{ marginRight: 10 }} />
              Reset
            </Button>
            <Button
              appearance="primary"
              onClick={handleConfirmCollaborators}
              className="collaborator-add-btn"
              style={{
                backgroundColor: "#c95792",
                color: "#fff",
                width: "100%",
              }}
            >
              <CgCheck size={26} style={{ marginRight: 4 }} />
              Confirm
            </Button>
          </DrawerBody>
        </OverlayDrawer>
      </div>
    </div>
  );
}
