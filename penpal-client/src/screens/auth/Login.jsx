import { useEffect, useState } from "react";
import "../../styles/screens/auth/Login.css";
import { Input, Button, Label } from "@fluentui/react-components";
import Header from "../../components/Header";
import colors from "../../constants/Colors";
import { useNavigate } from "react-router";
import { getCurrentUser, login } from "../../utils/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const isFormValid = formData.email.trim() && formData.password;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const response = await login(formData.email, formData.password);
    if (response.error) {
      setError(response.error);
      return;
    }
    setError("");
    console.log("Form submitted:", formData);
    const user = await getCurrentUser();
    if (user) {
      console.log("User logged in:", user);
      dispatch(setUser(user));
      navigate("/");
    }
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

  return (
    <div className="root">
      <Header />
      <video playsInline autoPlay muted loop className="video-background">
        <source
          src="https://cdn.pixabay.com/video/2023/09/02/178826-860734645_large.mp4"
          type="video/mp4"
        />
      </video>
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <h2 className="login-title">Login to your account</h2>
          <div className="field">
            <Label htmlFor="email">E-mail</Label>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              appearance="outline"
              size="medium"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <Button
            type="submit"
            appearance="primary"
            className="btn"
            style={{
              backgroundColor: colors.secondaryColor,
              color: "#fff",
              opacity: !isFormValid ? 0.4 : 1,
            }}
            disabled={!isFormValid}
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
