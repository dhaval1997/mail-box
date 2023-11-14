import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import generalSlice from "./generalSlice";

const store = configureStore({
  reducer: { auth: AuthSlice, general: generalSlice },
});

export default store;
