import React, { useEffect } from "react";
import useStore from "../../store/useStore";
import style from "./switchdarkMode-style.module.scss";
import Sun from "../../assets/svg/Sun.svg";
import Moon from "../../assets/svg/Moon and Stars.svg";
function SwitchDarkMode() {
  const { isChecked, switchCheck } = useStore();

  useEffect(() => {
    isChecked ? setLightMode() : setDarkMode();
  }, [isChecked]);

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };
  const toggleTheme = () => {
    switchCheck();
  };
  return (
    <div className={style.changeTheme}>
      <img src={Sun} alt="" />
      <div
        className={
          isChecked
            ? `${style.switch}`
            : `${style.switch} ${style.switchActive}`
        }
        onClick={() => document.querySelector("#checker").click()}
      >
        <div className={style.handle}></div>
      </div>
      <input
        id="checker"
        checked={isChecked}
        type="checkbox"
        onChange={toggleTheme}
        style={{
          visibility: "hidden",
          userSelect: "none",
          position: "absolute",
        }}
      />
      <img src={Moon} alt="" />
    </div>
  );
}

export default SwitchDarkMode;
