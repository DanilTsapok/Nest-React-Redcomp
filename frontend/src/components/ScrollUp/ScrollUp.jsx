import React, { useEffect, useState } from "react";
import style from "./scrollup-style.module.scss";

function ScrollUp() {
  const [activeScrollBtn, setActiveScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      position >= 300 ? setActiveScrollBtn(true) : setActiveScrollBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {activeScrollBtn ? (
        <div className={style.btnScroll}>
          <button onClick={() => scrollToTop()}>
            <img src="https://img.icons8.com/ios/50/FFFFFF/long-arrow-up--v1.png" />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ScrollUp;
