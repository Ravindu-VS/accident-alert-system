import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import BackButton from '../components/BackButton';
import 'E:\KDU\Projects\Accident-Alert-System\accident-alert-frontend\src\styles\login.css'; 


// Admin credentials
const ADMIN_CREDENTIALS = {
  username: "admin@demo.com",
  password: "admin123"
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials. Please use the admin account.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <BackButton />
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to Accident Alert System</p>
        </div>

        <form onSubmit={handleSubmit} className="input-group">
          <div>
            <label className="input-label">Email</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <FiUser className="h-5 w-5" />
              </div>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <FiLock className="h-5 w-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Admin Account Section */}
        <div className="demo-section">
          <h3 className="demo-title">Admin Account:</h3>
          <div className="demo-content">
            <p>Email: {ADMIN_CREDENTIALS.username}</p>
            <p>Password: {ADMIN_CREDENTIALS.password}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="link-text">
            Note: This is an admin-only portal. Mobile app users should use the dedicated mobile application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;