import React, { memo } from "react";

import {
  getPlatform,
} from "../data/samplePosts";

import {
  formatTime,
} from "../utils/calendar";

import useRenderTracker from "../hooks/useRenderTracker";

function PostCardBase({
  post,
  onDragStart,
  onClick,
  optimized,
}) {
  const renderCount =
    useRenderTracker("PostCard");

  const platform =
    getPlatform(
      post.platform
    );

  return (
    <button
      type="button"
      className="post-card"
      draggable
      onDragStart={(event) =>
        onDragStart(
          event,
          post.id
        )
      }
      onClick={() =>
        onClick(post)
      }
      title={`${post.title} — drag to another day/time`}
      style={{
        "--platform":
          platform.color,
      }}
    >

      <div className="post-card-top">

        <span className="platform-badge">

          <span className="platform-icon">
            {platform.icon}
          </span>

          {platform.name}

        </span>

        <span
          className={`status ${post.status.toLowerCase()}`}
        >
          {post.status}
        </span>

      </div>

      <strong className="post-title">
        {post.title}
      </strong>

      <div className="post-card-meta">

        <span>
          {formatTime(
            post.hour,
            post.minute
          )}
        </span>

        <span>
          {optimized
            ? "memoized"
            : "standard"}
        </span>

      </div>

      <span className="render-chip">
        render #{renderCount}
      </span>

    </button>
  );
}

export const MemoizedPostCard =
  memo(PostCardBase);

export default PostCardBase;