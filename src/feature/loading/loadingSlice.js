import { createSlice } from "@reduxjs/toolkit";

// isLoading initial state
const initialState = {
  isLoading: false,
};

// changeLoading reducer change the isLoading
const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    changeLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default loadingSlice.reducer;
export const { changeLoading } = loadingSlice.actions;
