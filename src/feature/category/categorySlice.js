import { createSlice } from "@reduxjs/toolkit";

// categories initial state
const initialState = {
  categories: [],
};

// the addCategory and resetCategory reducers
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
