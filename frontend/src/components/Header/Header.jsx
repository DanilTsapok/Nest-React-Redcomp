import React, { useEffect, useState } from "react";
import style from "./header-style.module.scss";
import Logo from "../../assets/svg/Logo.svg";
import { useTranslation } from "react-i18next";
import SwitchDarkMode from "../SwitchDarkMode/SwitchDarkMode";
function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime((prevTime) => (prevTime = new Date()));
    }, 1000);
    localStorage.setItem("lang", "en");

    return () => clearInterval(intervalId);
  }, []);
  const day = currentTime.getDate();
  const dayOfWeek = currentTime.getDay();
  const month = currentTime.getMonth();
  const year = currentTime.getFullYear();
  const time = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const months = [
    `${t("Month.January")}`,
    `${t("Month.February")}`,
    `${t("Month.March")}`,
    `${t("Month.April")}`,
    `${t("Month.May")}`,
    `${t("Month.June")}`,
    `${t("Month.July")}`,
    `${t("Month.August")}`,
    `${t("Month.September")}`,
    `${t("Month.October")}`,
    `${t("Month.November")}`,
    `${t("Month.December")}`,
  ];
  const week = [
    `${t("Days.Monday")}`,
    `${t("Days.Tuesday")}`,
    `${t("Days.Wednesday")}`,
    `${t("Days.Thursday")}`,
    `${t("Days.Friday")}`,
    `${t("Days.Saturday")}`,
    `${t("Days.Sunday")}`,
  ];

  const formatedDate = `${day} ${months[month]} ${year} ${
    dayOfWeek === 0 ? week[6] : week[dayOfWeek - 1]
  }`;

  return (
    <header className={style.header}>
      <div className={style.headerLeftSide}>
        <div className={style.logo}>
          <img src={Logo}></img>
          <h1>RedComp</h1>
        </div>
      </div>
      <div className={style.headerRightSide}>
        <p>{time}</p>
        <button className={style.btnLogin}>Logout</button>
        <p>{formatedDate}</p>
        <SwitchDarkMode />
      </div>
    </header>
  );
}

export default Header;
