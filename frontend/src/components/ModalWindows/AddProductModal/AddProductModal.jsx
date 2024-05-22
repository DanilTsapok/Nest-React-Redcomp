import React from "react";
import style from "./addCategory-style.module.scss";
import useStore from "../../../store/useStore";
import CloseIcon from "../../../assets/svg/Close.svg";
function AddProductModal() {
  const { addProductModalActive, setAddProductModalDisActive } = useStore();
  return (
    <div
      className={
        addProductModalActive
          ? `${style.settingModal} ${style.active}`
          : `${style.settingModal}`
      }
    >
      <div
        className={
          addProductModalActive
            ? `${style.settingModalBody} ${style.active}`
            : `${style.settingModalBody}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={style.btnClose}
          onClick={() => setAddProductModalDisActive()}
        >
          <img src={CloseIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
