import { removeToken } from "../utils/auth";

function Navbar({ user, onLogout }) {
  const handleLogout = () => {
    removeToken();
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-icon">J</div>

        <div>
          <h2>JWT Post Manager</h2>
          <span>Secure Content Management</span>
        </div>
      </div>

      <div className="nav-user">
        <div className="user-info">
          <strong>{user.name}</strong>
          <span className={`role-badge ${user.role}`}>
            {user.role.toUpperCase()}
          </span>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;