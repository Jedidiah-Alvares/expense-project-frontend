import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userAuth/userAuthSlice";
import categoryReducer from "../feature/category/categorySlice";
import loadingReducer from "../feature/loading/loadingSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    loading: loadingReducer,
  },
});

export default store;
