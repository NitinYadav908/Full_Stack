import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deletePost,
  updatePost,
} from "../redux/slices/postsSlice";

function PostDetailsModal({ post, onClose }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState(post.content);
  const [date, setDate] = useState(post.scheduledDate || "");
  const [time, setTime] = useState(post.scheduledTime || "");

  const saveChanges = () => {
    dispatch(
      updatePost({
        id: post.id,
        content,
        scheduledDate: date,
        scheduledTime: time,
        status: date && time ? "scheduled" : post.status,
      })
    );

    onClose();
  };

  const removePost = () => {
    if (window.confirm("Delete this post?")) {
      dispatch(deletePost(post.id));
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Post</h2>

          <button onClick={onClose}>×</button>
        </div>

        <div className="post-platform">
          {post.platform}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="schedule-fields">
          <div>
            <label>Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label>Time</label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="danger-button"
            onClick={removePost}
          >
            Delete
          </button>

          <button
            className="secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="primary-button"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsModal;