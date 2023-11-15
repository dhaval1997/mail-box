import { createSlice } from "@reduxjs/toolkit";

export const fireBase = "https://react-mailbox-3e595-default-rtdb.firebaseio.com/"

const initialState = {
  inboxMails: [],
  sentMails: [],
  favoriteMails: [],
  trashMails: [],
  draftsMails: [],
};

const MailSlice = createSlice({
  name: "MailSlice",
  initialState,
  reducers: {},
});

export const MailAction = MailSlice.actions;

export default MailSlice.reducer;
