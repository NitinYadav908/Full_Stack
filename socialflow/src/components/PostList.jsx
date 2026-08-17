import { useSelector } from "react-redux";
import EventCard from "./EventCard";

function PostList({ onSelect }) {
  const posts = useSelector((state) => state.posts.items);

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <div>📝</div>
        <h2>No Posts</h2>
        <p>Create your first social media post.</p>
      </div>
    );
  }

  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <EventCard
          key={post.id}
          post={post}
          onClick={() => onSelect(post)}
        />
      ))}
    </div>
  );
}

export default PostList;