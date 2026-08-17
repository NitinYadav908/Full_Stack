import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Post scheduled",
      message: "Your Instagram post was scheduled successfully.",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Post published",
      message: "Your LinkedIn post has been published.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Draft saved",
      message: "Your draft was saved successfully.",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setNotificationOpen(false);
  };

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const handleHelp = () => {
    setHelpOpen(true);
    setNotificationOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmed) {
      alert("Logout successful");
    }
  };

  return (
    <>
      <header className="top-header" ref={headerRef}>

        <div className="header-left">
          <div className="header-title">
            <h2>SocialFlow</h2>
          </div>
        </div>

        <div className="header-right">

          <button
            className="help-button"
            onClick={handleHelp}
          >
            <span className="help-icon">?</span>
            <span>Need Help?</span>
          </button>

          <div className="header-action">

            <button
              className="icon-button notification-button"
              onClick={toggleNotification}
              title="Notifications"
            >
              <span className="bell-icon">🔔</span>

              {unreadCount > 0 && (
                <span className="notification-badge">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationOpen && (
              <div className="notification-dropdown">

                <div className="dropdown-header">
                  <div>
                    <h3>Notifications</h3>

                    <span>
                      {unreadCount} unread
                    </span>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      className="mark-read-button"
                      onClick={markAllAsRead}
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="notification-list">

                  {notifications.length === 0 ? (
                    <div className="no-notifications">
                      <div>🔔</div>
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map(
                      (notification) => (
                        <div
                          key={notification.id}
                          className={`notification-item ${
                            !notification.read
                              ? "unread"
                              : ""
                          }`}
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                        >
                          <div className="notification-icon">
                            {notification.title.includes(
                              "scheduled"
                            )
                              ? "📅"
                              : notification.title.includes(
                                  "published"
                                )
                              ? "🚀"
                              : "📝"}
                          </div>

                          <div className="notification-content">
                            <strong>
                              {notification.title}
                            </strong>

                            <p>
                              {notification.message}
                            </p>

                            <span>
                              {notification.time}
                            </span>
                          </div>

                          {!notification.read && (
                            <span className="unread-dot" />
                          )}
                        </div>
                      )
                    )
                  )}

                </div>

                <div className="notification-footer">
                  <button
                    onClick={() =>
                      setNotificationOpen(false)
                    }
                  >
                    View all notifications
                  </button>
                </div>

              </div>
            )}

          </div>

          <div className="profile-container">

            <button
              className="profile-button"
              onClick={toggleProfile}
            >
              <div className="profile-avatar">
                N
              </div>

              <div className="profile-info">
                <strong>Nitin</strong>
                <span>Admin</span>
              </div>

              <span className="profile-arrow">
                {profileOpen ? "▲" : "▼"}
              </span>
            </button>

            {profileOpen && (
              <div className="profile-dropdown">

                <div className="profile-dropdown-header">

                  <div className="large-avatar">
                    N
                  </div>

                  <div>
                    <strong>Nitin</strong>
                    <span>
                      nitin@example.com
                    </span>
                  </div>

                </div>

                <div className="profile-menu">

                  <button
  onClick={() => {
    setProfileOpen(false);
    navigate("/settings");
  }}
>
  <span>👤</span>
  My Profile
</button>

                  <button
  onClick={() => {
    setProfileOpen(false);
    navigate("/settings");
  }}
>
  <span>⚙️</span>
  Account Settings
</button>

                  <button
                    onClick={() => {
                      alert(
                        "Preferences will open here."
                      );
                      setProfileOpen(false);
                    }}
                  >
                    <span>🎨</span>
                    Preferences
                  </button>

                  <div className="profile-divider" />

                  <button
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    <span>↪</span>
                    Logout
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </header>

      {helpOpen && (
        <div
          className="help-overlay"
          onClick={() => setHelpOpen(false)}
        >
          <div
            className="help-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="help-modal-header">
              <div>
                <h2>How can we help?</h2>
                <p>
                  Find answers or contact our support team.
                </p>
              </div>

              <button
                className="close-button"
                onClick={() => setHelpOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="help-options">

              <button
                onClick={() =>
                  alert(
                    "Opening SocialFlow documentation..."
                  )
                }
              >
                <div className="help-option-icon">
                  📚
                </div>

                <div>
                  <strong>Documentation</strong>
                  <p>
                    Learn how to use SocialFlow.
                  </p>
                </div>

                <span>→</span>
              </button>

              <button
                onClick={() =>
                  alert(
                    "Opening frequently asked questions..."
                  )
                }
              >
                <div className="help-option-icon">
                  ❓
                </div>

                <div>
                  <strong>Frequently Asked Questions</strong>
                  <p>
                    Find answers to common questions.
                  </p>
                </div>

                <span>→</span>
              </button>

              <button
                onClick={() =>
                  alert(
                    "Support: support@socialflow.com"
                  )
                }
              >
                <div className="help-option-icon">
                  💬
                </div>

                <div>
                  <strong>Contact Support</strong>
                  <p>
                    Get help from our support team.
                  </p>
                </div>

                <span>→</span>
              </button>

              <button
                onClick={() =>
                  alert(
                    "Keyboard shortcuts:\n\nN - New Post\nC - Calendar\nP - Posts\nD - Dashboard"
                  )
                }
              >
                <div className="help-option-icon">
                  ⌨️
                </div>

                <div>
                  <strong>Keyboard Shortcuts</strong>
                  <p>
                    Work faster with shortcuts.
                  </p>
                </div>

                <span>→</span>
              </button>

            </div>

            <div className="help-footer">
              <span>
                Still need help?
              </span>

              <button
                onClick={() =>
                  alert(
                    "Support team: support@socialflow.com"
                  )
                }
              >
                Contact us
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Header;