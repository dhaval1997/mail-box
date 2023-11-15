import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isComposing: false,
  isReading: false,
  editorStartContent: { to: "", subject: "", content: "", mini: false },
  editorContent: { to: "", subject: "", content: "" },
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
      state.editorStartContent.mini = false;
    },
    closeCompose: (state) => {
      state.isComposing = false;
      state.editorStartContent = { ...state.editorContent, mini: true };
    },
    changeEditorContent: (states, actions) => {
      if (actions.payload.type === "to") {
        states.editorContent.to = actions.payload.to;
      } else if (actions.payload.type === "subject") {
        states.editorContent.subject = actions.payload.subject;
      } else if (actions.payload.type === "content") {
        states.editorContent.content = actions.payload.content;
      }
    },
    deletingCompose: (states) => {
      states.isComposing = false;
      states.editorContent = { to: "", subject: "", content: "" };
      states.editorStartContent = {
        to: "",
        subject: "",
        content: "",
        mini: false,
      };
    },
    openReading: (states) => {
      states.isReading = true;
      states.isNavOpen = false;
    },
    closeReading: (states) => {
      states.isReading = false;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  openCompose,
  closeCompose,
  changeEditorContent,
  deletingCompose,
  openReading,
  closeReading,
} = generalSlice.actions;

export default generalSlice.reducer;
