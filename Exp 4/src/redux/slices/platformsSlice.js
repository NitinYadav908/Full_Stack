import { createSlice } from "@reduxjs/toolkit";
import { platforms } from "../../data/platforms";

const platformsSlice = createSlice({
  name: "platforms",
  initialState: platforms,
  reducers: {},
});

export default platformsSlice.reducer;