import { createSlice } from "@reduxjs/toolkit";

// username initial state
const initialState = {
  isLoading: false,
};

// the auth and signOut reducers
// the auth will take care of sign up and sign in
const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    changeLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export default loadingSlice.reducer;
export const { changeLoading } = loadingSlice.actions;
