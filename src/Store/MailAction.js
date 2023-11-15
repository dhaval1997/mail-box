import axios from "axios";
import { deletingCompose } from "./generalSlice";

export const saveDraft = ({ editorContent, networkEmail, fireBase }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${fireBase}/${networkEmail}/drafts.json`,
        {
          data: new Date(),
          editorContent,
        }
      );
      const draftId = response.data.name;
      await axios.put(`${fireBase}/${networkEmail}/drafts/${draftId}.json`, {
        data: new Date(),
        editorContent: { ...editorContent, draftId },
      });
      dispatch(deletingCompose());
    } catch (error) {
      console.error("Error in saveDraft:", error);
    }
  };
};

export const sendMail = ({
  editorContent,
  senderEmail,
  receiverEmail,
  networkEmail,
  fireBase,
  draftId,
}) => {
  return async (dispatch) => {
    if (draftId) {
      await axios.delete(`${fireBase}/${networkEmail}/drafts/${draftId}.json`);
    }
    await axios.post(`${fireBase}/${networkEmail}/sent.json`, {
      date: new Date(),
      from: senderEmail,
      editorContent,
      isRead: false,
    });

    await axios.post(`${fireBase}/${receiverEmail}/inbox.json`, {
      date: new Date(),
      from: senderEmail,
      editorContent,
      isRead: false,
    });
    dispatch(deletingCompose());
  };
};

// Inside MailAction module

export const someActionToAddMailToInbox = (newMail) => ({
  type: "SOME_ACTION_TO_ADD_MAIL_TO_INBOX",
  payload: newMail,
});

export const someActionToMarkMailAsFavorite = (mailId) => ({
  type: "SOME_ACTION_TO_MARK_MAIL_AS_FAVORITE",
  payload: mailId,
});

export const someActionToDeleteMail = (mailId) => ({
  type: "SOME_ACTION_TO_DELETE_MAIL",
  payload: mailId,
});
