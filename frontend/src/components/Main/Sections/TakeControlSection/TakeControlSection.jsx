import React from "react";
import style from "./takeControlSection.module.scss";
import PSImg from "../../../../assets/svg/PC.svg";
import video from "../../../../assets/video2.mp4";
function TakeControlSection() {
  return (
    <div className={style.takeControlSectionBody}>
      {/* <div className={style.controlSectionBodyTitle}></div> */}
      <video src={video} loop autoPlay muted></video>
      <div className={style.pcConsist}>
        <div>
          <img src={PSImg} alt="" />
        </div>
        <div className={style.pcConfiguration}>
          <h1>PC Configuration</h1>
          <ul>
            <li>VGA</li>
            <li>CPU</li>
            <li>Motherboard</li>
            <li>RAM</li>
            <li>Cooling</li>
            <li>SSD</li>
            <li>Power supply</li>
            <li>Case</li>
            <li>Fans</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TakeControlSection;
