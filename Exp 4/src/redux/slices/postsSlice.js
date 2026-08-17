import { createSlice } from "@reduxjs/toolkit";

const initialPosts = [
  {
    id: "1",
    platform: "instagram",
    content: "Introducing our new product! 🚀",
    status: "scheduled",
    scheduledDate: "2026-08-20",
    scheduledTime: "10:00",
    duration: 30,
    likes: 245,
    comments: 32,
    shares: 18,
    views: 3200,
  },
  {
    id: "2",
    platform: "linkedin",
    content: "We are excited to announce our latest company update.",
    status: "scheduled",
    scheduledDate: "2026-08-21",
    scheduledTime: "14:00",
    duration: 30,
    likes: 180,
    comments: 24,
    shares: 12,
    views: 2100,
  },
  {
    id: "3",
    platform: "facebook",
    content: "Thank you to our amazing community!",
    status: "published",
    scheduledDate: "2026-08-15",
    scheduledTime: "11:00",
    duration: 30,
    likes: 320,
    comments: 41,
    shares: 29,
    views: 4500,
  },
  {
    id: "4",
    platform: "instagram",
    content: "Behind the scenes at SocialFlow.",
    status: "draft",
    scheduledDate: "",
    scheduledTime: "",
    duration: 30,
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
  },
  {
    id: "5",
    platform: "linkedin",
    content: "5 social media strategies for 2026.",
    status: "published",
    scheduledDate: "2026-08-10",
    scheduledTime: "16:00",
    duration: 30,
    likes: 290,
    comments: 38,
    shares: 35,
    views: 3900,
  },
  {
    id: "6",
    platform: "twitter",
    content: "Small steps create big results. 💡",
    status: "scheduled",
    scheduledDate: "2026-08-25",
    scheduledTime: "18:00",
    duration: 30,
    likes: 95,
    comments: 14,
    shares: 8,
    views: 1400,
  },
];

const savedPosts = localStorage.getItem("socialflow_posts");

const initialState = {
  items: savedPosts
    ? JSON.parse(savedPosts)
    : initialPosts,
};

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem(
        "socialflow_posts",
        JSON.stringify(state.items)
      );
    },

    updatePost: (state, action) => {
      const { id, ...changes } = action.payload;

      const index = state.items.findIndex(
        (post) => post.id === id
      );

      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...changes,
        };

        localStorage.setItem(
          "socialflow_posts",
          JSON.stringify(state.items)
        );
      }
    },

    deletePost: (state, action) => {
      state.items = state.items.filter(
        (post) => post.id !== action.payload
      );

      localStorage.setItem(
        "socialflow_posts",
        JSON.stringify(state.items)
      );
    },

    schedulePost: (state, action) => {
      const {
        id,
        scheduledDate,
        scheduledTime,
      } = action.payload;

      const post = state.items.find(
        (item) => item.id === id
      );

      if (post) {
        post.scheduledDate = scheduledDate;
        post.scheduledTime = scheduledTime;
        post.status = "scheduled";
      }

      localStorage.setItem(
        "socialflow_posts",
        JSON.stringify(state.items)
      );
    },

    publishPost: (state, action) => {
      const post = state.items.find(
        (item) => item.id === action.payload
      );

      if (post) {
        post.status = "published";
      }

      localStorage.setItem(
        "socialflow_posts",
        JSON.stringify(state.items)
      );
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  schedulePost,
  publishPost,
} = postsSlice.actions;

export default postsSlice.reducer;