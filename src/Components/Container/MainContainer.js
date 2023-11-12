import React from "react";
import { useSelector } from "react-redux";

const MainContainer = ({ children }) => {
  const isNavOpen = useSelector((state) => state.nav.isNavOpen);
  return (
    <div
      className=" w-screen text-slate-800 h-screen flex items-center justify-center py-10 px-4 bg-center bg-cover"
      style={{
        backgroundImage: `url(${"https://plus.unsplash.com/premium_photo-1673697239936-c2599b0b0498?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`,
      }}
    >
      <div className="w-full h-full border border-white max-w-5xl border-opacity-40 bg-opacity-20 rounded-2xl">
        <div
          className={`relative backdrop-blur-md rounded-2xl h-full grid grid-flow-col grid-cols-12 overflow-y-hidden`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
