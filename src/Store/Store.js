import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import generalSlice from "./generalSlice";
import MailSlice from "./MailSlice";

const store = configureStore({
  reducer: { auth: AuthSlice, general: generalSlice, mail: MailSlice },
});

export default store;
