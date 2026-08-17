import { hasPermission } from "../utils/permissions";

function PostCard({ post, role, onEdit, onDelete }) {
  return (
    <article className="post-card">
      <div className="post-header">
        <div>
          <span className="post-category">{post.category}</span>
          <h3>{post.title}</h3>
        </div>

        <span className="post-date">{post.date}</span>
      </div>

      <p className="post-content">{post.content}</p>

      <div className="post-footer">
        <span className="author">By {post.author}</span>

        <div className="post-actions">
          {hasPermission(role, "canEdit") && (
            <button className="edit-button" onClick={() => onEdit(post)}>
              Edit
            </button>
          )}

          {hasPermission(role, "canDelete") && (
            <button
              className="delete-button"
              onClick={() => onDelete(post.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default PostCard;