import React from "react";
import AuthModal from "../ModalWindows/AuthModal/AuthModal";
import HeaderSection from "./Sections/HeaderSection/HeaderSection";
import Footer from "../Footer/Footer";
import TakeControlSection from "./Sections/TakeControlSection/TakeControlSection";
import CategorySection from "./Sections/CategorySection/CategorySection";
import Navbar from "../Navbar/Navbar";
import style from "./main-style.module.scss";
import InfiniteSlide from "./Sections/InfiniteSlide/infiniteSlide";
import AddCategoryModal from "../ModalWindows/AddCategoryModal/AddCategoryModal";
import Notification from "../ModalWindows/Notification/Notification";
function Main() {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          // width: "100%",
          // height: "100%",
        }}
      >
        {/* <Navbar /> */}
        <div className={style.contentBody}>
          <HeaderSection />
          <InfiniteSlide />
          <TakeControlSection />
          <CategorySection />
          <AuthModal />
          <AddCategoryModal />
          <Notification />
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

export default Main;
