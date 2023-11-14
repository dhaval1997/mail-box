import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ navData }) => {

  return (
    <li className="py-1">
      <NavLink
        to={navData.path}
        className={({ isActive }) => {
          return isActive
            ? "activeNav text-zinc-100 fill-zinc-100 font-light bg-zinc-800 bg-opacity-20"
            : "text-slate-950 fill-slate-950 font-light";
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
