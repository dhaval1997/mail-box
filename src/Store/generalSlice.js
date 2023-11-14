import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isComposing: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    openCompose: (state) => {
      state.isComposing = true;
    },
    closeCompose: (state) => {
      state.isComposing = false;
    },
  },
});

export const { startLoading, stopLoading } = generalSlice.actions;

export default generalSlice.reducer;
