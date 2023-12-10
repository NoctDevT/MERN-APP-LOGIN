import react, { useState, useRef, useEffect, useLayoutEffect } from "react";

import "../App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  MdAccountCircle,
  MdHome,
  MdMail,
  MdManageSearch,
} from "react-icons/md";

// import useDarkMode from './hooks/useDarkMode';

export default function Sidebar() {
  const Wrapper = ({ children }) => <div> </div>;

  return (
    <div
      className="relative top-0 left-0 h-screen w-[6rem] m-0 
      flex flex-col 
      bg-gray-900 text-white shadow-lg   dark:bg-slate-200 transition-all duration-700 "
    >
      {/* <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li> */}

      <SidebarIcon
        icon={<MdManageSearch size="28" />}
        text={"search"}
        navigation="/"
      />
      <SidebarIcon
        icon={<MdAccountCircle size="28" />}
        text={"Users"}
        navigation="/Users"
      />
      <SidebarIcon
        icon={<MdMail size="28" />}
        text={"Messages"}
        navigation="/messages"
      />
      <SidebarIcon
        icon={<MdHome size="28" />}
        text={"Login"}
        navigation="/Login"
      />
    </div>
  );
}

const SidebarIcon = ({ icon, text = "tooltip 💡", navigation }) => {
  return (
    <Link to={navigation}>
      <div className="sidebar-icon group">
        {icon}

        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </div>
    </Link>
  );
};
