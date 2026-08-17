import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.items);

  const scheduled = posts.filter(
    (post) => post.status === "scheduled"
  );

  const published = posts.filter(
    (post) => post.status === "published"
  );

  const drafts = posts.filter(
    (post) => post.status === "draft"
  );

  return (
    <div className="page">
      <div className="dashboard-heading">
        <div>
          <h1>Good evening, Nitin 👋</h1>
          <p>
            Here's what's happening with your content.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/posts")}
        >
          + Create Post
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>📅</span>
          <h3>Scheduled</h3>
          <strong>{scheduled.length}</strong>
          <p>Upcoming posts</p>
        </div>

        <div className="stat-card">
          <span>📝</span>
          <h3>Drafts</h3>
          <strong>{drafts.length}</strong>
          <p>Waiting to be scheduled</p>
        </div>

        <div className="stat-card">
          <span>🚀</span>
          <h3>Published</h3>
          <strong>{published.length}</strong>
          <p>Successfully published</p>
        </div>

        <div className="stat-card">
          <span>📊</span>
          <h3>Total Posts</h3>
          <strong>{posts.length}</strong>
          <p>All your content</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Upcoming Posts</h2>

          <button
            onClick={() => navigate("/calendar")}
          >
            View Calendar →
          </button>
        </div>

        <div className="upcoming-list">
          {scheduled.length === 0 ? (
            <div className="empty-state">
              No upcoming scheduled posts.
            </div>
          ) : (
            scheduled.slice(0, 5).map((post) => (
              <div
                className="upcoming-item"
                key={post.id}
              >
                <div className="upcoming-icon">
                  📱
                </div>

                <div className="upcoming-content">
                  <strong>{post.platform}</strong>
                  <p>{post.content}</p>
                </div>

                <div className="upcoming-time">
                  <strong>
                    {post.scheduledDate}
                  </strong>
                  <span>
                    {post.scheduledTime}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;