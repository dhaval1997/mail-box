import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, signUpUser, forgotPassword } from "../../Store/authActions";
import { startLoading, stopLoading } from "../../Store/generalSlice";

const AuthForm = () => {
  const [isLogging, setIsLogging] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiToken = useSelector((state) => state.auth.apiToken);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const error = useSelector((store) => store.auth.error);

  console.log(userInfo);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!isLogging) {
      const name = nameRef.current.value;
      const confirm = confirmRef.current.value;
      dispatch(startLoading());
      dispatch(signUpUser(email, password, name, confirm, apiToken))
        .then(() => {
          dispatch(stopLoading());
        })
        .catch((error) => {
          dispatch(stopLoading());
          console.error("Signup Error:", error.message);
        });
    } else {
      dispatch(startLoading());
      dispatch(loginUser(email, password, apiToken, navigate))
        .then(() => {
          dispatch(stopLoading());
        })
        .catch((error) => {
          dispatch(stopLoading());
          console.error("Login Error:", error.message);
        });
    }
  };

  const forgotPasswordHandler = async () => {
    const email = prompt("Enter your email:");
    if (email) {
      dispatch(forgotPassword(email, apiToken));
    }
  };

  return (
    <>
      <div
        className="w-screen bg-center bg-cover"
        style={{
          backgroundImage: `url(${"https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`,
        }}
      >
        <div className="flex justify-center items-center h-screen bg-opacity-20">
          <div
            className="rounded-lg shadow-2xl p-6 mx-auto relative border border-amber-50 border-opacity-40 backdrop-blur-md"
            style={{ width: "380px" }}
          >
            <h2 className="text-xl text-amber-50 text-center font-semibold">
              Welcome to your MailBox
            </h2>
            <h2 className="text-2xl text-amber-50 text-center font-semibold">
              {isLogging ? "Log In" : "Sign Up"}
            </h2>
            <div className="my-4">
              <form onSubmit={submitHandler}>
                {error && <h2 className="text-red-900">{error}</h2>}
                {!isLogging && (
                  <div className="mb-3">
                    <input
                      type="text"
                      required
                      ref={nameRef}
                      className="w-full outline-emerald-700 bg-amber-50 rounded text-emerald-800 h-9 p-3"
                      placeholder="Name"
                    />
                  </div>
                )}
                <div className="mb-3">
                  <input
                    type="email"
                    required
                    ref={emailRef}
                    className="w-full outline-emerald-700 bg-amber-50 rounded text-emerald-800 h-9 p-3"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    required
                    name="password"
                    ref={passwordRef}
                    minLength={8}
                    className="w-full outline-emerald-700 bg-amber-50 rounded text-emerald-800 h-9 p-3"
                    placeholder="Password"
                  />
                </div>
                {!isLogging && (
                  <div className="mb-3">
                    <input
                      type="password"
                      required
                      name="confirm"
                      ref={confirmRef}
                      minLength={8}
                      className="w-full outline-emerald-700 bg-amber-50 rounded text-emerald-800 h-9 p-3"
                      placeholder="Confirm Password"
                    />
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    className="bg-emerald-800 w-full border rounded p-1.5 hover:bg-emerald-900 font-semibold text-emerald-50"
                  >
                    {isLogging ? "Log In" : "Sign Up"}
                  </button>
                </div>
              </form>
              {isLogging && (
                <div className="text-center text-emerald-800 hover:text-emerald-900 font-medium">
                  <button className="p-1.5" onClick={forgotPasswordHandler}>
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-emerald-800 w-full border rounded p-1.5 hover:bg-emerald-900 font-semibold text-emerald-50"
              onClick={() => setIsLogging(!isLogging)}
            >
              {isLogging
                ? "Don't have an account? Sign Up"
                : "Have an account? Log In"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
