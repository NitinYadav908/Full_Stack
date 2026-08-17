import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    currentView: "dayGridMonth",
    selectedDate: null,
    selectedPostId: null,
    filterPlatform: "all",
    filterStatus: "all",
  },
  reducers: {
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },

    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },

    setSelectedPostId: (state, action) => {
      state.selectedPostId = action.payload;
    },

    setPlatformFilter: (state, action) => {
      state.filterPlatform = action.payload;
    },

    setStatusFilter: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const {
  setCurrentView,
  setSelectedDate,
  setSelectedPostId,
  setPlatformFilter,
  setStatusFilter,
} = calendarSlice.actions;

export default calendarSlice.reducer;