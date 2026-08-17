import { useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { hasPermission } from "../utils/permissions";

const POSTS_KEY = "jwt_post_manager_posts";

function getStoredPosts() {
  try {
    const storedPosts = localStorage.getItem(POSTS_KEY);

    if (!storedPosts) {
      return [];
    }

    return JSON.parse(storedPosts);
  } catch {
    return [];
  }
}

function Dashboard({ user, onLogout }) {
  const [posts, setPosts] = useState(getStoredPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const updatePosts = (updatedPosts) => {
    setPosts(updatedPosts);
    localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
  };

  const handleSave = (postData) => {
    if (postData.id) {
      const updatedPosts = posts.map((post) =>
        post.id === postData.id
          ? {
              ...post,
              title: postData.title,
              category: postData.category,
              content: postData.content,
              updatedAt: new Date().toLocaleDateString("en-GB"),
            }
          : post
      );

      updatePosts(updatedPosts);
    } else {
      const newPost = {
        id: Date.now(),
        title: postData.title,
        category: postData.category,
        content: postData.content,
        author: user.name,
        createdBy: user.username,
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };

      updatePosts([newPost, ...posts]);
    }

    setEditingPost(null);
    setShowForm(false);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    const updatedPosts = posts.filter((post) => post.id !== id);

    updatePosts(updatedPosts);
  };

  const openCreateForm = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  return (
    <div className="app">
      <Navbar user={user} onLogout={onLogout} />

      <main className="dashboard">
        <section className="welcome-section">
          <div>
            <span className="dashboard-label">DASHBOARD</span>

            <h1>Welcome back, Nitin</h1>

            <p>
              Manage your content according to your assigned access level.
            </p>
          </div>

          {hasPermission(user.role, "canCreate") && (
            <button className="create-button" onClick={openCreateForm}>
              + Create Post
            </button>
          )}
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Posts</span>
            <strong>{posts.length}</strong>
          </div>

          <div className="stat-card">
            <span>Your Role</span>
            <strong>{user.role.toUpperCase()}</strong>
          </div>

          <div className="stat-card">
            <span>Access Level</span>
            <strong>
              {user.role === "admin"
                ? "FULL"
                : user.role === "editor"
                ? "EDIT"
                : "VIEW"}
            </strong>
          </div>

          <div className="stat-card">
            <span>Authentication</span>
            <strong className="secure">SECURE</strong>
          </div>
        </section>

        <section className="security-banner">
          <div className="security-icon">✓</div>

          <div>
            <strong>JWT Authentication Active</strong>

            <p>
              Your current session is authenticated using a JSON Web Token.
            </p>
          </div>
        </section>

        <section className="posts-section">
          <div className="section-heading">
            <div>
              <h2>All Posts</h2>

              <p>
                {posts.length === 0
                  ? "No posts have been created yet."
                  : "Content available according to your permissions"}
              </p>
            </div>

            <span className="post-count">
              {posts.length} {posts.length === 1 ? "Post" : "Posts"}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>

              <h3>No Posts Yet</h3>

              <p>
                {user.role === "admin"
                  ? "Create the first post to get started."
                  : "The administrator has not created any posts yet."}
              </p>

              {hasPermission(user.role, "canCreate") && (
                <button className="create-button" onClick={openCreateForm}>
                  + Create First Post
                </button>
              )}
            </div>
          ) : (
            <div className="posts-list">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  role={user.role}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {showForm && (
        <PostForm
          post={editingPost}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;