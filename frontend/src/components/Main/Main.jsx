import React from "react";
import AuthModal from "../ModalWindows/AuthModal/AuthModal";
import HeaderSection from "./Sections/HeaderSection/HeaderSection";
import Footer from "../Footer/Footer";
import TakeControlSection from "./Sections/TakeControlSection/TakeControlSection";

function Main() {
  return (
    <>
      <div
        style={{
          padding: "70px 0 0 0",
          minHeight: "400vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HeaderSection />
        <TakeControlSection />
        <></>
        <AuthModal />
      </div>
      <Footer />
    </>
  );
}

export default Main;
