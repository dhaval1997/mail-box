import {
  logInSuccess,
  logInFailure,
  signUpSuccess,
  signUpFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearError,
} from "./AuthSlice";

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
