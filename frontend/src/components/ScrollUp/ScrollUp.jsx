import React, { useEffect, useState } from "react";

function ScrollUp() {
  const [activeScrollBtn, setActiveScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.screenY;
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
          <button onClick={() => scrollToTop()}>Up</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ScrollUp;
