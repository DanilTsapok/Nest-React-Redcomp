import React from "react";
import useStore from "../../../store/useStore";
import style from "./notificationstyle.module.scss";
import CloseIcon from "../../../assets/svg/Close.svg";
import BadIcon from "../../../assets/svg/badRequest.png";
import DoneIcon from "../../../assets/svg/done.png";
function Notification() {
  const { notificationState, setNotificationStateDisabled, notificationText } =
    useStore();
  console.log(notificationText);
  return (
    <div
      className={
        notificationState
          ? `${style.settingModal} ${style.active}`
          : `${style.settingModal}`
      }
    >
      <div
        className={
          notificationState
            ? `${style.settingModalBody} ${style.active}`
            : `${style.settingModalBody}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        {notificationText.status ? (
          <img src={DoneIcon} />
        ) : (
          <img src={BadIcon} />
        )}
        <h3>{notificationText.text}</h3>
      </div>
    </div>
  );
}

export default Notification;
