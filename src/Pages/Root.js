import React from "react";
import MainContainer from "../Components/Container/MainContainer";
import NavBar from "../Components/NavItems/NavBar";
import { Outlet } from "react-router-dom";
import ComposeButton from "../Components/Container/ComposeButton";

const Root = () => {
  return (
    <>
      <MainContainer>
        <NavBar />
        <div className=" relative bg-zinc-800 bg-opacity-20 sm:col-start-3 sm:col-span-full row-span-full row-start-2 rounded-2xl">
          <Outlet />
        </div>
      </MainContainer>
      <ComposeButton />
    </>
  );
};

export default Root;
