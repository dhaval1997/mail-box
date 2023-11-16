import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("idToken");

const initialState = {
  userInfo: {
    idToken: storedToken || "",
    name: "",
    email: "",
    emailVerified: false,
    networkEmail: "",
    photoURL: "",
    uniqueId: "",
  },
  error: null,
  apiToken: "AIzaSyDkuC7W8VipjDC9oRGrvuX3WNjasdKX9yQ",
};

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const AuthAction = AuthSlice.actions;

export default AuthSlice.reducer;
