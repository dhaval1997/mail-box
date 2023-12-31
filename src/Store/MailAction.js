import axios from "axios";
import { deletingCompose } from "./GeneralSlice";
import { MailAction, fireBase } from "./MailSlice";
import { getUserInfo, logoutHandler } from "./authActions";

export function saveDraft({ editorContent, networkEmail, draftId }) {
  return async (dispatch) => {
    if (draftId) {
      await axios.put(`${fireBase}/${networkEmail}/drafts/${draftId}.json`, {
        date: new Date(),
        editorContent,
      });
    } else {
      await axios.post(`${fireBase}/${networkEmail}/drafts.json`, {
        date: new Date(),
        editorContent,
      });
    }
    dispatch(deletingCompose());
  };
}

export function sendMail({
  editorContent,
  senderEmail,
  receiverEmail,
  networkEmail,
  senderInfo,
  draftId,
}) {
  return async (dispatch) => {
    if (draftId) {
      console.log(draftId);
      await axios.delete(`${fireBase}/${networkEmail}/drafts/${draftId}.json`);
    }

    await axios.post(`${fireBase}/${networkEmail}/sent.json`, {
      date: new Date(),
      from: senderEmail,
      isRead: false,
      senderInfo,
      editorContent,
    });

    await axios.post(`${fireBase}/${receiverEmail}/inbox.json`, {
      date: new Date(),
      from: senderEmail,
      senderInfo,
      editorContent,
      isRead: false,
      isFavorite: false,
      isTrash: false,
    });
    dispatch(deletingCompose());
  };
}

export function getMails(networkEmail, type) {
  return (dispatch) => {
    if (type === "login") {
      let mailInterval = setInterval(async () => {
        const response = await axios.get(`${fireBase}/${networkEmail}.json`);
        dispatch(arrangeMails(response.data));
      }, 2000);
      localStorage.setItem("login", mailInterval);
    }
    if (type === "update") {
      let mailInterval = setInterval(async () => {
        const response = await axios.get(`${fireBase}/${networkEmail}.json`);
        dispatch(arrangeMails(response.data));
      }, 2000);
      localStorage.setItem("update", mailInterval);
    }
  };
}

export function getFastMails(networkEmail) {
  return async (dispatch) => {
    const response = await axios.get(`${fireBase}/${networkEmail}.json`);
    dispatch(arrangeMails(response.data));
  };
}

export function arrangeMails(data) {
  return (dispatch) => {
    try {
      if (data) {
        if (data.inbox) {
          const updatedData = Object.entries(data.inbox).map((item) => {
            item[1] = { ...item[1], id: item[0] };
            return item;
          });

          dispatch(MailAction.addAllMails({ allMails: updatedData }));

          const allInboxMail = updatedData.filter((item) => {
            return item[1].isTrash === false;
          });

          dispatch(
            MailAction.addInboxMails({
              inbox: allInboxMail,
            })
          );

          dispatch(
            MailAction.addFavorite({
              favorite: allInboxMail.filter((item) => {
                return item[1].isFavorite === true;
              }),
            })
          );

          const trashMail = updatedData.filter((item) => {
            return item[1].isTrash === true;
          });

          dispatch(MailAction.addTrashMails({ trash: trashMail }));
        }
        if (!data.inbox) {
          dispatch(MailAction.addAllMails({ allMails: [] }));
          dispatch(MailAction.addTrashMails({ trash: [] }));
        }
        if (data.sent) {
          const updatedData = Object.entries(data.sent).map((item) => {
            item[1] = { ...item[1], id: item[0] };
            return item;
          });
          dispatch(MailAction.addSentMails({ sent: updatedData }));
        }
        if (!data.sent) {
          dispatch(MailAction.addSentMails({ sent: [] }));
        }
        if (data.drafts) {
          const updatedData = Object.entries(data.drafts).map((item) => {
            item[1] = {
              ...item[1],
              editorContent: { ...item[1].editorContent, draftId: item[0] },
            };
            return item;
          });
          dispatch(MailAction.addDraftsMails({ drafts: updatedData }));
        }
        if (!data.drafts) {
          dispatch(MailAction.addDraftsMails({ drafts: [] }));
        }
      }
      if (!data) {
        dispatch(MailAction.addAllMails({ allMails: [] }));
        dispatch(MailAction.addTrashMails({ trash: [] }));
        dispatch(MailAction.addSentMails({ sent: [] }));
        dispatch(MailAction.addDraftsMails({ drafts: [] }));
      }
    } catch (error) {
      dispatch(logoutHandler());
    }
  };
}

export function updateMails(data, networkEmail, type, place = "") {
  return async (dispatch) => {
    let newData;
    if (type === "hasOpen") {
      newData = { ...data, isRead: true };
    } else if (type === "favorite") {
      newData = { ...data, isFavorite: !data.isFavorite };
    } else if (type === "trash") {
      newData = { ...data, isTrash: true };
    } else if (type === "notTrash") {
      newData = { ...data, isTrash: false };
    }

    if (place === "sent") {
      await axios.put(
        `${fireBase}/${networkEmail}/sent/${data.id}.json`,
        newData
      );
    } else {
      await axios.put(
        `${fireBase}/${networkEmail}/inbox/${data.id}.json`,
        newData
      );
    }

    dispatch(getFastMails(networkEmail));
  };
}

export function deleteMails(data, networkEmail, place = "") {
  return async (dispatch) => {
    if (place === "inbox") {
      await axios.delete(`${fireBase}/${networkEmail}/inbox/${data.id}.json`);
    } else if (place === "sent") {
      await axios.delete(`${fireBase}/${networkEmail}/sent/${data.id}.json`);
    } else if (place === "drafts") {
      await axios.delete(
        `${fireBase}/${networkEmail}/drafts/${data.draftId}.json`
      );
    }
    dispatch(getFastMails(networkEmail));
  };
}

export function updateProfile(photoUrl, displayName, idToken, apiToken) {
  return async (dispatch) => {
    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiToken}`,
      { idToken, displayName, photoUrl, returnSecureToken: false }
    );
    dispatch(getUserInfo(idToken));
  };
}
