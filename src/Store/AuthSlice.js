import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    idToken: "",
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
    logInSuccess: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.error = null;
      localStorage.setItem("authToken", action.payload.userInfo.idToken);
    },
    logInFailure: (state, action) => {
      state.error = action.payload;
    },
    logOut: (state) => {
      state.userInfo = initialState.userInfo;
      state.error = null;
      localStorage.removeItem("authToken");
    },
    signUpSuccess: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
    },
    forgotPasswordSuccess: (state) => {
      state.error = null;
    },
    forgotPasswordFailure: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  logInSuccess,
  logInFailure,
  signUpSuccess,
  signUpFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearError,
  logOut,
} = AuthSlice.actions;

export default AuthSlice.reducer;
