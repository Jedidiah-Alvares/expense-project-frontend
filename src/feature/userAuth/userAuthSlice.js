import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
};

const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (state, action) => {
      state.name = action.payload;
    },
    signOut: (state) => {
      state.name = null;
    },
  },
});

export default userAuthSlice.reducer;
export const { auth, signOut } = userAuthSlice.actions;
