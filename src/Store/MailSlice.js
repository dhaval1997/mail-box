import { createSlice } from "@reduxjs/toolkit";

export const fireBase =
  "https://react-mailbox-3e595-default-rtdb.firebaseio.com";

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
  reducers: {
    // Action creator to add a new mail to the inbox
    addMailToInbox: (state, action) => {
      state.inboxMails.push(action.payload);
    },

    // Action creator to mark a mail as favorite
    markMailAsFavorite: (state, action) => {
      const mailId = action.payload;
      const mailToMark = state.inboxMails.find((mail) => mail.id === mailId);
      if (mailToMark) {
        state.favoriteMails.push(mailToMark);
      }
    },

    // Action creator to move a mail to trash
    moveMailToTrash: (state, action) => {
      const mailId = action.payload;
      state.inboxMails = state.inboxMails.filter((mail) => mail.id !== mailId);
      state.trashMails.push(mailId);
    },

    // Action creator to restore a mail from trash
    restoreMailFromTrash: (state, action) => {
      const mailId = action.payload;
      state.trashMails = state.trashMails.filter((id) => id !== mailId);
      // Assuming you have a way to retrieve the mail object from the server or elsewhere
      const restoredMail = fetchMailById(mailId);
      if (restoredMail) {
        state.inboxMails.push(restoredMail);
      }
    },
  },
});

export const {
  addMailToInbox,
  markMailAsFavorite,
  moveMailToTrash,
  restoreMailFromTrash,
} = MailSlice.actions;

export default MailSlice.reducer;
