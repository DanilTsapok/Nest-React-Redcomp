import React from "react";
import style from "./addCategory-style.module.scss";
import useStore from "../../../store/useStore";
import CloseIcon from "../../../assets/svg/Close.svg";
function AddEditProductModal() {
  const { addEditCategoryModalActive, setEditCategoryModalDisActive } =
    useStore();
  return (
    <div
      className={
        addEditCategoryModalActive
          ? `${style.settingModal} ${style.active}`
          : `${style.settingModal}`
      }
    >
      <div
        className={
          addEditCategoryModalActive
            ? `${style.settingModalBody} ${style.active}`
            : `${style.settingModalBody}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={style.btnClose}
          onClick={() => setEditCategoryModalDisActive()}
        >
          <img src={CloseIcon} alt="" />
        </div>

        <h2>Edit Product</h2>
      </div>
    </div>
  );
}

export default AddEditProductModal;
