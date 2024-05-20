import React from "react";
import Header from "../Header/Header";
import ScrollUp from "../ScrollUp/ScrollUp";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollUp />
      <Footer />
    </>
  );
}

export default Layout;
