import React from "react";
import useStore from "../../../../store/useStore";
// import Logo from "../../../../assets/svg/Logo.svg";
import style from "./headerSection-style.module.scss";
// import LogoIcon from "../../../../assets/svg/R Key.svg";
function HeaderSection() {
  const { activeBtnLogin, authModalState, setAuthModalActive } = useStore();
  console.log(authModalState);
  return (
    <>
      <div className={style.headerSectionMain}>
        <div className={style.mainLeftSide}>
          <div className={style.Title}>
            <div className={style.Line}></div>

            <div>
              <h1>REDCOMP</h1>
              <p>
                Your Tech Journey Starts with RedComp:
                <br /> Where Innovation Meets Excellence!
              </p>
            </div>
          </div>
          {activeBtnLogin ? (
            <button
              className={style.btnLogin}
              onClick={() => setAuthModalActive()}
            >
              Login
            </button>
          ) : (
            <button
              className={style.btnLogin}
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
