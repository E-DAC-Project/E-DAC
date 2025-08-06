import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Login.css";
import logo from "../images/logo.png";
import animation from "../images/animation.json";
import signin from "../images/signin.json";
import Lottie from "lottie-react";

const Login = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, email, password, confirmPassword } =
      signupData;

    // Frontend validation
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return toast.warning("All fields are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.warning("Enter a valid email address.");
    }

    if (phone.length < 10 || !/^\d+$/.test(phone)) {
      return toast.warning("Enter a valid phone number.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/users/signup",
        signupData
      );
      if (res.status === 201) {
        toast.success("Signup successful! Please login.");
        setIsSignUpMode(false);
        setSignupData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.log("Exception: "+err);
      toast.error("Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/users/signin", loginData);
      console.log(res);
      if (res.status === 200) {
        const {token, Role, Name} = res.data;
        if (rememberMe) {
          localStorage.setItem("token", token);
          localStorage.setItem("Name", Name);
          localStorage.setItem("role", Role);
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("Name", Name);
          sessionStorage.setItem("role", Role);
        }

        toast.success("Login Sucessful!!");

        if (Role === "ROLE_ADMIN") {
          navigate("/admindashboard");
        } else if (Role === "ROLE_STUDENT") {
          navigate("/studentdashboard");
        } else {
          toast.warning("Unknown user role");
        }
      } else {
        console.log(res);
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`containers ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* ==== Login Form ==== */}
          <form className="sign-in-form" onSubmit={handleLogin}>
            <img src={logo} width="50px" alt="Brand" />
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                required
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
            <div className="mb-2 d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label>Remember Me</label>
            </div>
            <button type="submit" className="btn solid" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* ==== Signup Form ==== */}
          <form className="sign-up-form" onSubmit={handleSignup}>
            <img src={logo} width="100px" alt="Brand" />
            <h2 className="title">Sign up</h2>
            {[
              "firstName",
              "lastName",
              "phone",
              "email",
              "password",
              "confirmPassword",
            ].map((field, idx) => (
              <div className="input-field" key={idx}>
                <i
                  className={`fas fa-${
                    field.includes("name")
                      ? "user"
                      : field === "email"
                      ? "envelope"
                      : "lock"
                  }`}
                ></i>
                <input
                  type={field.includes("password") ? "password" : "text"}
                  placeholder={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase())}
                  required
                  value={signupData[field]}
                  onChange={(e) =>
                    setSignupData({ ...signupData, [field]: e.target.value })
                  }
                />
              </div>
            ))}
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>

      {/* ==== Panels ==== */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Be part of something great. It all starts with a click.</p>
            <button
              className="btn transparent"
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up
            </button>
          </div>
          <Lottie animationData={animation} className="image" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Access your account and pick up where you left off.</p>
            <button
              className="btn transparent"
              onClick={() => setIsSignUpMode(false)}
            >
              Sign in
            </button>
          </div>
          <Lottie animationData={signin} className="image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
