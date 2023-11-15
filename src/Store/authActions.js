import {
  logInSuccess,
  logInFailure,
  signUpSuccess,
  signUpFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearError,
} from "./AuthSlice";
import { startLoading, stopLoading } from "./generalSlice";
import { getFastMails, getMails } from "./MailAction";

export const loginUser =
  (email, password, apiToken, navigate) => async (dispatch) => {
    try {
      const signInResponse = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );
      const signInData = await signInResponse.json();
      const lookupResponse = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: signInData.idToken,
          }),
        }
      );
      const lookupData = await lookupResponse.json();

      if (lookupData.users && lookupData.users.length > 0) {
        const receivedUserInfo = {
          idToken: signInData.idToken,
          name: lookupData.users[0].displayName,
          email: lookupData.users[0].email,
          emailVerified: lookupData.users[0].emailVerified,
          networkEmail: lookupData.users[0].email.replace(/[^a-zA-Z0-9]/gi, ""),
          photoUrl: lookupData.users[0].photoUrl,
          uniqueId: "",
        };
        dispatch(logInSuccess({ userInfo: receivedUserInfo }));
        navigate("/");
      } else {
        dispatch(logInFailure("User data not found"));
      }
    } catch (error) {
      console.error("Log In Error:", error.message);
      dispatch(logInFailure(error.message));
    }
  };

export const signUpUser =
  (email, password, name, confirm, apiToken) => async (dispatch) => {
    if (password === confirm) {
      try {
        const signUpResponse = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
          }
        );

        const signUpData = await signUpResponse.json();
        if (signUpResponse.ok) {
          const idToken = signUpData.idToken;
          const photoURL = "";

          await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiToken}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idToken,
                displayName: name,
                photoURL,
                returnSecureToken: false,
              }),
            }
          );
          dispatch(signUpSuccess({ userInfo: signUpData }));
        } else {
          dispatch(signUpFailure(signUpData.error.message));
        }
      } catch (error) {
        console.error("Sign Up Error:", error.message);
        dispatch(signUpFailure(error.message));
      }
    } else {
      alert("Password does not match");
    }
  };

export const forgotPassword = (email, apiToken) => async (dispatch) => {
  try {
    const forgotPasswordResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email,
        }),
      }
    );

    if (forgotPasswordResponse.ok) {
      dispatch(forgotPasswordSuccess());
      alert("Password reset link has been sent to your email");
    } else {
      const forgotPasswordData = await forgotPasswordResponse.json();
      dispatch(forgotPasswordFailure(forgotPasswordData.error.message));
    }
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    dispatch(forgotPasswordFailure(error.message));
  }
};

export function getUserInfo(idToken) {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const reply = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAYLfpvm4HItUrb6rxmYb_lnz5-PT2Zsyw`,
        { idToken }
      );
      const newUserInfo = {
        idToken,
        name: reply.data.users[0].displayName,
        email: reply.data.users[0].email,
        emailVerified: reply.data.users[0].emailVerified,
        networkEmail: reply.data.users[0].email.replace(/[^a-zA-Z0-9]/gi, ""),
        photoUrl: reply.data.users[0].photoUrl,
      };
      dispatch(getFastMails(newUserInfo.networkEmail));
      dispatch(getMails(newUserInfo.networkEmail, "update"));
      dispatch(AuthAction.updateUser({ userInfo: newUserInfo }));
    } catch (error) {
      console.log(error);
    }
    dispatch(stopLoading());
  };
}

export function logoutHandler(networkEmail) {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(
      AuthAction.updateUser({
        userInfo: {
          idToken: "",
          name: "",
          email: "",
          emailVerified: false,
          networkEmail: "",
          photoUrl: "",
        },
      })
    );
    clearInterval(localStorage.getItem("login"));
    clearInterval(localStorage.getItem("update"));
    localStorage.removeItem("login");
    localStorage.removeItem("update");
  };
}
