import { useState } from "react";
import { useDispatch } from "react-redux";
import { schedulePost } from "../redux/slices/postsSlice";

function ScheduleModal({ post, onClose }) {
  const dispatch = useDispatch();

  const [date, setDate] = useState(
    post?.scheduledDate || ""
  );

  const [time, setTime] = useState(
    post?.scheduledTime || ""
  );

  const handleSchedule = () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    dispatch(
      schedulePost({
        id: post.id,
        scheduledDate: date,
        scheduledTime: time,
      })
    );

    alert("Post scheduled successfully");

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal schedule-modal">
        <div className="modal-header">
          <h2>Schedule Post</h2>

          <button onClick={onClose}>×</button>
        </div>

        <div className="schedule-preview">
          <span>Platform</span>
          <strong>{post.platform}</strong>

          <p>{post.content}</p>
        </div>

        <label>Select Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Select Time</label>

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <div className="modal-actions">
          <button
            className="secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="primary-button"
            onClick={handleSchedule}
          >
            Schedule Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleModal;