import React from "react";
import Header from "../Header/Header";
import ScrollUp from "../ScrollUp/ScrollUp";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollUp />
    </>
  );
}

export default Layout;
