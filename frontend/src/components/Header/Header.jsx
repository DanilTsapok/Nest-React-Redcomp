import React, { useEffect, useState } from "react";
import style from "./header-style.module.scss";
import Logo from "../../assets/svg/Logo.svg";
import { useTranslation } from "react-i18next";
import SwitchDarkMode from "../SwitchDarkMode/SwitchDarkMode";
import axios from "axios";
import TimeIcon from "../../assets/svg/Time.svg";
import { Link } from "react-router-dom";
import useStore from "../../store/useStore";
import ProfileIcon from "../../assets/svg/Profile.svg";
function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [t, i18n] = useTranslation("global");
  const [btnLogoutActive, setBtLogoutAcitve] = useState(false);

  const { currentUser, countNotification } = useStore();
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
  const logoutUser = async () => {
    try {
      await axios.post("http://localhost:4000/auth/log-out");
      localStorage.removeItem("currentUser");
      window.location.replace("/");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <header className={style.header}>
      <div className={style.headerLeftSide}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className={style.logo}>
            <img src={Logo}></img>
            <h1>
              <span>Red</span>Comp
            </h1>
          </div>
        </Link>
      </div>
      <div className={style.headerRightSide}>
        {currentUser ? (
          <div className={style.btnLogin}>
            <button className={style.Btn} onClick={() => logoutUser()}>
              <div className={style.sign}>
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>

              <div className={style.text}>Logout</div>
            </button>
          </div>
        ) : (
          <></>
        )}
        {currentUser ? (
          <div style={{ display: "flex" }}>
            <p>
              <Link
                to="/profile"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <img
                  width="35"
                  height="64"
                  src={ProfileIcon}
                  alt="user-male-circle"
                />
                {currentUser.name}
              </Link>
            </p>
            <div
              className={style.notification}
              data-content={countNotification}
            >
              <div className={style.bell_container}>
                <div className={style.bell}></div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <p style={{ display: "flex", gap: 5 }}>
          <img style={{ width: 20 }} src={TimeIcon} alt="" />
          {time}
        </p>
        <p>{formatedDate}</p>
        <SwitchDarkMode />
      </div>
    </header>
  );
}

export default Header;
