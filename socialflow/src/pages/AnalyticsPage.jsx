import { useMemo } from "react";
import { useSelector } from "react-redux";

function AnalyticsPage() {
  const posts = useSelector(
    (state) => state.posts.items
  );

  const analytics = useMemo(() => {
    const total = posts.length;

    const published = posts.filter(
      (post) => post.status === "published"
    ).length;

    const scheduled = posts.filter(
      (post) => post.status === "scheduled"
    ).length;

    const drafts = posts.filter(
      (post) => post.status === "draft"
    ).length;

    const likes = posts.reduce(
      (sum, post) => sum + (post.likes || 0),
      0
    );

    const comments = posts.reduce(
      (sum, post) => sum + (post.comments || 0),
      0
    );

    const shares = posts.reduce(
      (sum, post) => sum + (post.shares || 0),
      0
    );

    const views = posts.reduce(
      (sum, post) => sum + (post.views || 0),
      0
    );

    const engagement =
      likes + comments + shares;

    const platformData = {};

    posts.forEach((post) => {
      const platform = post.platform || "other";

      if (!platformData[platform]) {
        platformData[platform] = {
          posts: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          views: 0,
        };
      }

      platformData[platform].posts++;

      platformData[platform].likes +=
        post.likes || 0;

      platformData[platform].comments +=
        post.comments || 0;

      platformData[platform].shares +=
        post.shares || 0;

      platformData[platform].views +=
        post.views || 0;
    });

    return {
      total,
      published,
      scheduled,
      drafts,
      likes,
      comments,
      shares,
      views,
      engagement,
      platformData,
    };
  }, [posts]);

  return (
    <div className="page analytics-page">

      <div className="page-header">
        <div>
          <h1>Analytics</h1>

          <p>
            Track your social media performance
            and content activity.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            alert(
              "Analytics report generated successfully."
            )
          }
        >
          Generate Report
        </button>
      </div>

      <div className="analytics-cards">

        <div className="analytics-card">
          <span>Total Posts</span>
          <strong>{analytics.total}</strong>
          <small>All content</small>
        </div>

        <div className="analytics-card">
          <span>Published</span>
          <strong>{analytics.published}</strong>
          <small>Live posts</small>
        </div>

        <div className="analytics-card">
          <span>Scheduled</span>
          <strong>{analytics.scheduled}</strong>
          <small>Upcoming posts</small>
        </div>

        <div className="analytics-card">
          <span>Drafts</span>
          <strong>{analytics.drafts}</strong>
          <small>Unpublished content</small>
        </div>

      </div>

      <div className="analytics-grid">

        <div className="analytics-panel">

          <div className="panel-heading">
            <div>
              <h2>Engagement Overview</h2>
              <p>
                Overall interaction with your content
              </p>
            </div>
          </div>

          <div className="engagement-list">

            <div>
              <span>👁 Views</span>
              <strong>
                {analytics.views.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>❤️ Likes</span>
              <strong>
                {analytics.likes.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>💬 Comments</span>
              <strong>
                {analytics.comments.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>🔄 Shares</span>
              <strong>
                {analytics.shares.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>⚡ Engagement</span>
              <strong>
                {analytics.engagement.toLocaleString()}
              </strong>
            </div>

          </div>

        </div>

        <div className="analytics-panel">

          <div className="panel-heading">
            <div>
              <h2>Content Status</h2>
              <p>
                Distribution of your posts
              </p>
            </div>
          </div>

          <div className="status-chart">

            <div className="status-row">
              <span>Published</span>

              <div className="progress">
                <div
                  style={{
                    width:
                      analytics.total
                        ? `${(analytics.published / analytics.total) * 100}%`
                        : "0%",
                  }}
                />
              </div>

              <strong>
                {analytics.published}
              </strong>
            </div>

            <div className="status-row">
              <span>Scheduled</span>

              <div className="progress">
                <div
                  style={{
                    width:
                      analytics.total
                        ? `${(analytics.scheduled / analytics.total) * 100}%`
                        : "0%",
                  }}
                />
              </div>

              <strong>
                {analytics.scheduled}
              </strong>
            </div>

            <div className="status-row">
              <span>Drafts</span>

              <div className="progress">
                <div
                  style={{
                    width:
                      analytics.total
                        ? `${(analytics.drafts / analytics.total) * 100}%`
                        : "0%",
                  }}
                />
              </div>

              <strong>
                {analytics.drafts}
              </strong>
            </div>

          </div>

        </div>

      </div>

      <div className="analytics-panel platform-panel">

        <div className="panel-heading">
          <div>
            <h2>Platform Performance</h2>
            <p>
              Performance across social platforms
            </p>
          </div>
        </div>

        <div className="platform-table">

          <div className="table-header">
            <span>Platform</span>
            <span>Posts</span>
            <span>Views</span>
            <span>Likes</span>
            <span>Comments</span>
            <span>Shares</span>
          </div>

          {Object.entries(
            analytics.platformData
          ).map(([platform, data]) => (
            <div
              className="table-row"
              key={platform}
            >
              <span className="platform-name">
                {platform}
              </span>

              <span>{data.posts}</span>

              <span>
                {data.views.toLocaleString()}
              </span>

              <span>
                {data.likes.toLocaleString()}
              </span>

              <span>
                {data.comments.toLocaleString()}
              </span>

              <span>
                {data.shares.toLocaleString()}
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default AnalyticsPage;