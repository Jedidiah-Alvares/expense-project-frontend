import { createSlice } from "@reduxjs/toolkit";

// username initial state
const initialState = {
  categories: [],
};

// the auth and signOut reducers
// the auth will take care of sign up and sign in
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    resetCategory: (state) => {
      state.categories = [];
    },
  },
});

export default categorySlice.reducer;
export const { addCategory, resetCategory } = categorySlice.actions;
