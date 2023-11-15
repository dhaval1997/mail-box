import React, { useEffect } from "react";
import MainContainer from "../Components/Container/MainContainer";
import NavBar from "../Components/NavItems/NavBar";
import { Outlet } from "react-router-dom";
import ComposeButton from "../Components/Container/ComposeButton";
import { useDispatch, useSelector } from "react-redux";
import { stopLoading } from "../Store/generalSlice";
import ComposeBox from "../Components/Compose/ComposeBox";
import NotificationCompose from "../Components/Compose/NotificationCompose";

const Root = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isReading = useSelector((state) => state.general.isReading);
  const isComposing = useSelector((state) => state.general.isComposing);
  const editorStartContent = useSelector(
    (state) => state.general.editorStartContent
  );
  useEffect(() => {
    dispatch(stopLoading());
  }, [dispatch]);

  return (
    <>
      <MainContainer>
        {isComposing && <ComposeBox />}
        {editorStartContent.mini && <NotificationCompose />}
        <NavBar />
        <div
          className={`relative bg-zinc-800 bg-opacity-20 ${
            isReading ? "hidden sm: block" : "col-span-6"
          } ${isReading ? "sm:col-span-5" : "sm:col-span-10"}`}
        >
          <Outlet />
        </div>
        {isReading && (
          <div className=" relative p-2 editorCorner col-span-12 sm:col-span-5 bg-white bg-opacity-75 rounded-lg grid grid-rows-12"></div>
        )}
      </MainContainer>
      {!isComposing && <ComposeButton />}
    </>
  );
};

export default Root;
