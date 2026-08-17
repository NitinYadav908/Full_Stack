import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-brand">
        <div className="brand-logo">
          S
        </div>

        <div className="brand-text">
          <h2>SocialFlow</h2>
          <span>Social Media Manager</span>
        </div>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-section-title">
          MAIN MENU
        </span>

        <nav className="sidebar-nav">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">⌂</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">▣</span>
            <span>Calendar</span>
          </NavLink>

          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">▤</span>
            <span>Posts</span>
          </NavLink>

          <NavLink
            to="/drafts"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">▱</span>
            <span>Drafts</span>
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">⌁</span>
            <span>Analytics</span>
          </NavLink>

        </nav>
      </div>

      <div className="sidebar-section sidebar-bottom">

        <span className="sidebar-section-title">
          SYSTEM
        </span>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">⚙</span>
          <span>Settings</span>
        </NavLink>

      </div>

      <div className="sidebar-user">

        <div className="sidebar-user-avatar">
          N
        </div>

        <div className="sidebar-user-info">
          <strong>Nitin</strong>
          <span>Administrator</span>
        </div>

        <button
          className="sidebar-user-menu"
          onClick={() =>
            window.location.href = "/settings"
          }
        >
          ⋮
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;