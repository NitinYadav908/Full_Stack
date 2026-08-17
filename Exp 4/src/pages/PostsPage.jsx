import { useState } from "react";
import { useSelector } from "react-redux";
import PostComposer from "../components/PostComposer";
import PostDetailsModal from "../components/PostDetailsModal";

function PostsPage() {
  const posts = useSelector((state) => state.posts.items);

  const [showComposer, setShowComposer] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Posts</h1>
          <p>Manage all your social media content.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowComposer(true)}
        >
          + Create Post
        </button>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <div
            className="post-card"
            key={post.id}
            onClick={() => setSelectedPost(post)}
          >
            <div className="post-card-top">
              <span>{post.platform}</span>

              <span
                className={`status ${post.status}`}
              >
                {post.status}
              </span>
            </div>

            <p>{post.content}</p>

            {post.scheduledDate && (
              <div className="post-date">
                📅 {post.scheduledDate} ⏰{" "}
                {post.scheduledTime}
              </div>
            )}
          </div>
        ))}
      </div>

      {showComposer && (
        <div className="modal-overlay">
          <PostComposer
            onClose={() => setShowComposer(false)}
          />
        </div>
      )}

      {selectedPost && (
        <PostDetailsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

export default PostsPage;