import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userAuth/userAuthSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
