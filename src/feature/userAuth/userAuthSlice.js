import { createSlice } from "@reduxjs/toolkit";

// username initial state
const initialState = {
  name: null,
};

// the auth and signOut reducers
// the auth will take care of sign up and sign in
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
