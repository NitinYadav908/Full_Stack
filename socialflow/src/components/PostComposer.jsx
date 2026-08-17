import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/slices/postsSlice";
import PlatformSelector from "./PlatformSelector";

function PostComposer({ onClose }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const createDraft = () => {
    if (!content.trim()) {
      alert("Please enter post content");
      return;
    }

    dispatch(
      addPost({
        id: Date.now().toString(),
        content,
        platform,
        status: "draft",
        scheduledDate: "",
        scheduledTime: "",
        duration: 30,
        createdAt: new Date().toISOString(),
      })
    );

    alert("Draft saved successfully");

    setContent("");
    if (onClose) onClose();
  };

  const schedule = () => {
    if (!content.trim()) {
      alert("Please enter post content");
      return;
    }

    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    dispatch(
      addPost({
        id: Date.now().toString(),
        content,
        platform,
        status: "scheduled",
        scheduledDate: date,
        scheduledTime: time,
        duration: 30,
        createdAt: new Date().toISOString(),
      })
    );

    alert("Post scheduled successfully");

    setContent("");
    setDate("");
    setTime("");

    if (onClose) onClose();
  };

  return (
    <div className="composer">
      <div className="composer-header">
        <h2>Create Post</h2>

        {onClose && (
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        )}
      </div>

      <label>Platform</label>

      <PlatformSelector
        value={platform}
        onChange={setPlatform}
      />

      <label>Post Content</label>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something amazing..."
        maxLength={5000}
      />

      <div className="character-count">
        {content.length} / 5000
      </div>

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

      <div className="composer-actions">
        <button
          className="secondary-button"
          onClick={createDraft}
        >
          Save Draft
        </button>

        <button
          className="primary-button"
          onClick={schedule}
        >
          Schedule Post
        </button>
      </div>
    </div>
  );
}

export default PostComposer;