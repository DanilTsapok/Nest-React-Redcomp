import React from "react";
import style from "./addCategory-style.module.scss";
import useStore from "../../../store/useStore";
import CloseIcon from "../../../assets/svg/Close.svg";
function AddCategoryModal() {
  const { addCategoryModalActive, setAddCategoryModalDisActive } = useStore();
  return (
    <div
      className={
        addCategoryModalActive
          ? `${style.settingModal} ${style.active}`
          : `${style.settingModal}`
      }
    >
      <div
        className={
          addCategoryModalActive
            ? `${style.settingModalBody} ${style.active}`
            : `${style.settingModalBody}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={style.btnClose}
          onClick={() => setAddCategoryModalDisActive()}
        >
          <img src={CloseIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;
