import { useEffect, useState } from "react";

function PostForm({ post, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setContent(post.content);
    } else {
      setTitle("");
      setCategory("Technology");
      setContent("");
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      id: post?.id,
      title,
      category,
      content,
    });
  };

  return (
    <div className="form-overlay">
      <div className="post-form-card">
        <div className="form-header">
          <div>
            <h2>{post ? "Edit Post" : "Create New Post"}</h2>
            <p>
              {post
                ? "Update the selected post"
                : "Add a new post to the system"}
            </p>
          </div>

          <button className="close-button" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Post Title</label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Technology</option>
            <option>Education</option>
            <option>Security</option>
            <option>Development</option>
          </select>

          <label>Content</label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content..."
            rows="6"
            required
          />

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit" className="save-button">
              {post ? "Update Post" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;