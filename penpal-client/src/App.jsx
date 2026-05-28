import "./App.css";
import Login from "./screens/auth/Login";
import Signup from "./screens/auth/Signup";
import { Routes, Route } from "react-router";
import Home from "./screens/Home";
import Create from "./screens/story/Create";
import Profile from "./screens/user/Profile";
import { useEffect } from "react";
import { getCurrentUser } from "./utils/auth";
import { setUser } from "./redux/user/userSlice";
import { useDispatch } from "react-redux";
import Story from "./screens/story/Story";
import MyProfile from "./screens/user/MyProfile";
import Edit from "./screens/story/Edit";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        console.log("User is logged in:", user);
        dispatch(setUser(user));
      }
    };

    fetchUser();
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:storyId" element={<Edit />} />
      <Route path="/story/:storyId" element={<Story />} />
      <Route path="/user/:userEmail" element={<Profile />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
