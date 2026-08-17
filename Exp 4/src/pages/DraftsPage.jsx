import { useSelector } from "react-redux";
import { useState } from "react";
import PostDetailsModal from "../components/PostDetailsModal";

function DraftsPage() {
  const posts = useSelector((state) => state.posts.items);

  const [selectedPost, setSelectedPost] = useState(null);

  const drafts = posts.filter(
    (post) => post.status === "draft"
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Drafts</h1>
          <p>Posts that are waiting to be scheduled.</p>
        </div>
      </div>

      {drafts.length === 0 ? (
        <div className="empty-state">
          <div>📁</div>
          <h2>No drafts</h2>
          <p>Your saved drafts will appear here.</p>
        </div>
      ) : (
        <div className="posts-grid">
          {drafts.map((post) => (
            <div
              className="post-card"
              key={post.id}
              onClick={() => setSelectedPost(post)}
            >
              <div className="post-card-top">
                <span>{post.platform}</span>

                <span className="status draft">
                  Draft
                </span>
              </div>

              <p>{post.content}</p>
            </div>
          ))}
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

export default DraftsPage;