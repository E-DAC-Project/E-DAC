import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import animation from "../images/animation.json";
import signin from "../images/signin.json"
import Lottie from "lottie-react";

const Login = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
  
      const result = await response.json();
  
      if (response.status === 200) {
        alert("Signup successful! Please login.");
        setIsSignUpMode(false);
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong during signup.");
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
  
      const result = await response.json();
  
      if (response.status === 200) {
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login.");
    }
  };
  

  return (
    <div className={`containers ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleLogin}>
            <div>
              <img src={logo} width="100px" alt="Brand" />
            </div>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                required
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
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
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <Link to="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i className="fab fa-google"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </form>

          <form className="sign-up-form" onSubmit={handleSignup}>
            <div>
              <img src={logo} width="100px" alt="Brand" />
            </div>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="First Name"
                required
                value={signupData.firstname}
                onChange={(e) =>
                  setSignupData({ ...signupData, firstname: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Last Name"
                required
                value={signupData.lastname}
                onChange={(e) =>
                  setSignupData({ ...signupData, lastname: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <i className="fas fa-phone"></i>
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={signupData.phone}
                onChange={(e) =>
                  setSignupData({ ...signupData, phone: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                required
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
              />
            </div>
            <input type="submit" value="Sign up" className="btn" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <Link to="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i className="fab fa-google"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>

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
            <h3>One of Us?</h3>
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
