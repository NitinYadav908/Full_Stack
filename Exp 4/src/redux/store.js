import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import platformsReducer from "./slices/platformsSlice";
import calendarReducer from "./slices/calendarSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    platforms: platformsReducer,
    calendar: calendarReducer,
  },
});