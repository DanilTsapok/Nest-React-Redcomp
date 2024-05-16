import React, { useEffect } from "react";
import useStore from "../../../store/useStore";
import CloseIcon from "../../../assets/svg/Close.svg";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import style from "./auth-style.module.scss";
function AuthModal() {
  const { authModalState, setAuthModalDisActive } = useStore();
  useEffect(() => {
    authModalState
      ? document.getElementsByTagName("body")[0].classList.add("modal-open")
      : document.getElementsByTagName("body")[0].classList.remove("modal-open");
  }, [authModalState]);
  return (
    <div
      className={
        authModalState
          ? `${style.authModal} ${style.active}`
          : `${style.authModal}`
      }
    >
      <div
        className={
          authModalState
            ? `${style.authModalBody} ${style.active}`
            : `${style.authModalBody}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.btnClose}>
          <img src={CloseIcon} onClick={() => setAuthModalDisActive()} alt="" />
        </div>
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
}

export default AuthModal;
