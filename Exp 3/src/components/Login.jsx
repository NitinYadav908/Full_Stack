import { useState } from "react";
import { mockUsers } from "../data/mockUsers";
import { generateToken } from "../utils/jwt";
import { saveToken } from "../utils/auth";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const user = mockUsers.find(
      (item) =>
        item.username === username &&
        item.password === password &&
        item.role === role
    );

    if (!user) {
      setError("Invalid username, password, or selected role.");
      return;
    }

    const token = generateToken(user);

    saveToken(token);

    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">JWT</div>

        <h1>Secure Post Manager</h1>
        <p className="login-subtitle">
          JWT Authentication & Role-Based Access Control
        </p>

        <form onSubmit={handleLogin}>
          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Select Your Role</label>

          <div className="role-options">
            {["admin", "editor", "viewer"].map((item) => (
              <button
                type="button"
                key={item}
                className={`role-button ${
                  role === item ? "selected" : ""
                }`}
                onClick={() => setRole(item)}
              >
                <strong>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </strong>

                <span>
                  {item === "admin" && "Full Access"}
                  {item === "editor" && "View & Edit"}
                  {item === "viewer" && "View Only"}
                </span>
              </button>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button className="login-button" type="submit">
            Login Securely
          </button>
        </form>

        <div className="demo-credentials">
          <strong>Demo Credentials</strong>
          <p>Admin: admin / admin123</p>
          <p>Editor: editor / editor123</p>
          <p>Viewer: viewer / viewer123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;