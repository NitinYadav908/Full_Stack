function EventCard({ post, onClick }) {
  return (
    <div className="event-card" onClick={onClick}>
      <div className="event-card-header">
        <span className="event-platform">
          {post.platform}
        </span>

        <span className={`status ${post.status}`}>
          {post.status}
        </span>
      </div>

      <p>{post.content}</p>

      {post.scheduledDate && (
        <div className="event-card-time">
          📅 {post.scheduledDate}
          <br />
          ⏰ {post.scheduledTime}
        </div>
      )}
    </div>
  );
}

export default EventCard;