import React from "react";

import PostCard, {
  MemoizedPostCard,
} from "./PostCard";

export default function CalendarEvent({
  post,
  onDragStart,
  onClick,
  reactMemoOn,
}) {
  const Card = reactMemoOn
    ? MemoizedPostCard
    : PostCard;

  return (
    <Card
      post={post}
      onDragStart={onDragStart}
      onClick={onClick}
      optimized={reactMemoOn}
    />
  );
}