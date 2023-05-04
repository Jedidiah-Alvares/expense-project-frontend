import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userAuth/userAuthSlice";
import categoryReducer from "../feature/category/categorySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  },
});

export default store;
