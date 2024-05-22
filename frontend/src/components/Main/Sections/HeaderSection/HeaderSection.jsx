import React from "react";
import useStore from "../../../../store/useStore";
// import Logo from "../../../../assets/svg/Logo.svg";
import style from "./headerSection-style.module.scss";
// import LogoIcon from "../../../../assets/svg/R Key.svg";
import video from "../../../../assets/video.mp4";
function HeaderSection() {
  const { activeBtnLogin, authModalState, setAuthModalActive, currentUser } =
    useStore();
  console.log(authModalState);
  return (
    <>
      <div className={style.headerSectionMain}>
        <video src={video} loop autoPlay muted></video>
        <div className={style.mainLeftSide}>
          <div className={style.Title}>
            <div className={style.Line}></div>
            <div>
              <h1>
                <span>RED</span>COMP
              </h1>
              <p>
                Your Tech Journey Starts with RedComp:
                <br /> Where Innovation Meets Excellence!
              </p>
            </div>
          </div>
          {!currentUser ? (
            // <button
            //   className={style.btnLogin}
            //   onClick={() => setAuthModalActive()}
            // >
            //   Login
            // </button>
            <div className={style.btnLogin}>
              <button
                className={style.cssbuttons_io_button}
                onClick={() => setAuthModalActive()}
              >
                Login
                <div className={style.icon}>
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          ) : (
            <button
              className={style.btnLogin}
              style={{ display: "none" }}
              onClick={() => setAuthModalActive()}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default HeaderSection;
