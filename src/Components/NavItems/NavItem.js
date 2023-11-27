import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ navData }) => {

  return (
    <li className="py-1">
      <NavLink
        to={navData.path}
        className={({ isActive }) => {
          return isActive
            ? "activeNav font-medium text-zinc-100 fill-zinc-100 bg-zinc-800 bg-opacity-20"
            : "text-slate-900 font-normal fill-slate-950";
        }}
      >
        <div className="relative bg-inherit flex items-center justify-start py-2 ps-4 space-x-2 rounded-s-lg">
          <p>{navData.navName}</p>
        </div>
      </NavLink>
    </li>
  );
};

export default NavItem;
