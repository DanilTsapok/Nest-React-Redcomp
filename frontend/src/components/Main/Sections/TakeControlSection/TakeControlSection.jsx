import React from "react";
import style from "./takeControlSection.module.scss";
import PSImg from "../../../../assets/svg/PC.svg";
function TakeControlSection() {
  return (
    <div className={style.takeControlSectionBody}>
      <div className={style.controlSectionBodyTitle}></div>
      <img src={PSImg} alt="" />
    </div>
  );
}

export default TakeControlSection;
