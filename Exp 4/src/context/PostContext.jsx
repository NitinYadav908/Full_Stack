import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import {
  clonePosts,
} from "../data/samplePosts";

import {
  createPost,
  movePost,
} from "../utils/calendar";

import {
  usePerformanceContext,
} from "./PerformanceContext";

const PostContext =
  createContext(null);

export function PostProvider({
  children,
}) {
  const [
    posts,
    setPosts,
  ] = useState(
    clonePosts
  );

  const {
    beginInteraction,
    markPostChange,
    markDragDrop,
    setLastAction,
    resetMetrics,
  } = usePerformanceContext();

  const updatePostPosition =
    useCallback(
      (
        id,
        date,
        hour
      ) => {

        const currentPost =
          posts.find(
            (post) =>
              post.id === id
          );

        if (!currentPost) {
          return;
        }

        const target =
          `${date.toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
            }
          )} / ${String(
            hour
          ).padStart(
            2,
            "0"
          )}:00`;

        beginInteraction(
          `Moved: ${currentPost.title} → ${target}`
        );

        markDragDrop();

        markPostChange();

        setLastAction(
          `${currentPost.title} moved → ${target}`
        );

        setPosts(
          (current) =>
            movePost(
              current,
              id,
              date,
              hour
            )
        );
      },
      [
        posts,
        beginInteraction,
        markDragDrop,
        markPostChange,
        setLastAction,
      ]
    );

  const addNewPost =
    useCallback(
      (payload) => {

        setPosts(
          (current) => {

            const newPost =
              createPost(
                current.length + 1,
                payload
              );

            beginInteraction(
              `Created: ${newPost.title}`
            );

            markPostChange();

            setLastAction(
              `Created → ${newPost.title}`
            );

            return [
              ...current,
              newPost,
            ];
          }
        );
      },
      [
        beginInteraction,
        markPostChange,
        setLastAction,
      ]
    );

  const resetPosts =
    useCallback(
      () => {
        setPosts(
          clonePosts()
        );

        resetMetrics();

        setLastAction(
          "Demo calendar restored"
        );
      },
      [
        resetMetrics,
        setLastAction,
      ]
    );

  return (
    <PostContext.Provider
      value={{
        posts,
        updatePostPosition,
        addNewPost,
        resetPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context =
    useContext(
      PostContext
    );

  if (!context) {
    throw new Error(
      "usePosts must be used inside PostProvider"
    );
  }

  return context;
}