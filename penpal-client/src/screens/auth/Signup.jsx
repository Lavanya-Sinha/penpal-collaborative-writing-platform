import { useEffect, useState } from "react";
import "../../styles/screens/auth/Signup.css";
import { Input, Button, Label } from "@fluentui/react-components";
import Header from "../../components/Header";
import colors from "../../constants/Colors";
import { getCurrentUser, register } from "../../utils/auth";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const response = await register(
      formData.username,
      formData.email,
      formData.password
    );
    if (response.error) {
      setError(response.error);
      return;
    }
    setError("");
    console.log("Form submitted:", formData);
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        console.log("User is logged in:", user);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const isFormValid =
    formData.username.trim() &&
    formData.email.trim() &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  return (
    <div className="root">
      <Header />
      <video playsInline autoPlay muted loop className="video-background">
        <source
          src="https://cdn.pixabay.com/video/2025/03/29/268528_large.mp4"
          type="video/mp4"
        />
      </video>
      <div className="signup">
        <form
          className="signup-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2 className="signup-title">Create an account</h2>
          <div className="field">
            <Label htmlFor="username">Your name</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              appearance="outline"
              size="medium"
            />
          </div>
          <div className="field">
            <Label htmlFor="email">Your email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              appearance="outline"
              size="medium"
            />
          </div>
          <div className="field">
            <Label htmlFor="password">Create password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              appearance="outline"
              size="medium"
            />
          </div>
          <div className="field">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              appearance="outline"
              size="medium"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <Button
            type="submit"
            appearance="primary"
            style={{
              backgroundColor: colors.secondaryColor,
              color: "#fff",
              opacity: !isFormValid ? 0.4 : 1,
            }}
            disabled={!isFormValid}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
