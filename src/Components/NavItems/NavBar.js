import React from "react";
import { useDispatch } from "react-redux";
import NavItem from "./NavItem";
import { logoutHandler } from "../../Store/authActions";

const NavBar = () => {
  const NavData = [
    {
      navName: "Inbox",
      path: "/",
    },
    {
      navName: "Starred",
      path: "/starred",
    },
    {
      navName: "Sent",
      path: "/sent",
    },
    {
      navName: "Drafts",
      path: "/drafts",
    },
    {
      navName: "Trash",
      path: "/trash",
    },
  ];
  const dispatch = useDispatch();
  return (
    <div className="relative col-span-6 sm:col-span-2  py-3">
      <div className="flex flex-col sm:justify-between justify-start h-full">
        <div className="px-2 flex items-center justify-between h-7 sm:justify-center sm:h-auto">
          <h1 className="block ps-3 sm:block headFont sm:ps-0 font-medium text-white opacity-90 text-xl">
            MailBox
          </h1>
        </div>
        <div className="mt-4 sm:mt-0">
          <ul>
            {NavData.map((item) => {
              return <NavItem key={item.navName} navData={item} />;
            })}
          </ul>
        </div>
        <div className="hidden sm:hidden"></div>
        <div className="items-center justify-center mt-auto sm:mt-0 space-x-2 flex sm:flex">
          <button onClick={() => dispatch(logoutHandler())}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
