import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openNav, closeNav } from "../../Store/NavbarSlice";
import NavItem from "./NavItem";
import { NavLink } from "react-router-dom";

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
  const isNavOpen = useSelector((state) => state.nav.isNavOpen);
  return (
    <div
      className={`relative ${
        isNavOpen ? "col-span-6" : "col-span-2"
      } sm:col-span-2  py-3`}
    >
      <div className="flex flex-col sm:justify-between justify-start h-full">
        <div
          className={`px-2 flex items-center ${
            isNavOpen ? "justify-between h-7" : "justify-center h-7"
          } sm:justify-center sm:h-auto`}
        >
          <h1
            className={`${
              isNavOpen ? "block ps-3" : "hidden ps-0"
            } sm:block headFont sm:ps-0 font-medium text-white opacity-90 text-xl`}
          >
            MailBox
          </h1>
          {!isNavOpen && (
            <button className="sm:hidden" onClick={() => dispatch(openNav())}>
              Open
            </button>
          )}
          {isNavOpen && (
            <button className="sm:hidden" onClick={() => dispatch(closeNav())}>
              Close
            </button>
          )}
        </div>
        <div className="mt-4 sm:mt-0">
          <ul>
            {NavData.map((item) => {
              return <NavItem key={item.navName} navData={item} />;
            })}
          </ul>
        </div>
        <div className={`${isNavOpen ? "hidden" : "block"} sm:hidden`}></div>
        <div
          className={`items-center justify-center mt-auto sm:mt-0 space-x-2 ${
            isNavOpen ? "flex" : "hidden"
          } sm:flex`}
        >
          <NavLink
            to={"/profile"}
            className={({ isActive }) => {
              return isActive
                ? "text-zinc-100 fill-zinc-100"
                : "text-slate-950 fill-slate-950";
            }}
          >
            Profile
          </NavLink>
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
