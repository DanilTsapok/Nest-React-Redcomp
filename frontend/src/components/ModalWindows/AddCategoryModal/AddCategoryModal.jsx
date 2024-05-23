import React from "react";
import style from "./addCategory-style.module.scss";
import useStore from "../../../store/useStore";
import CloseIcon from "../../../assets/svg/Close.svg";
import Logo from "../../../assets/svg/Logo.svg";
import { useFormik } from "formik";
import axios from "axios";
function AddCategoryModal() {
  const {
    addCategoryModalActive,
    setAddCategoryModalDisActive,
    setNotificationState,
    setNotificationText,
    setNotificationStateDisabled,
  } = useStore();

  const formik = useFormik({
    initialValues: {
      name: "",
      categoryImage: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:4000/category", {
          name: values.name,
          categoryImage: values.categoryImage,
        });
        setNotificationState();
        setTimeout(() => setNotificationStateDisabled(), 4000);
        response.status === 201 ? setNotificationText(true, "Success") : null;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (e) {
        setNotificationState();
        setNotificationText(false, "Wrong credentials");
        setTimeout(() => setNotificationStateDisabled(), 4000);
      }
    },
  });

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
        <form
          className={style.formBody}
          method="post"
          onSubmit={formik.handleSubmit}
        >
          <div className={style.logo}>
            <img src={Logo}></img>
            <h1>
              <span>Red</span>Comp
            </h1>
            <div className={style.formTitle}>
              <h1>Add category</h1>
            </div>
          </div>
          <div className={style.formInfoBlock}>
            <div className={style.nameSection}>
              <input
                type="text"
                name="name"
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <label
                className={
                  (formik.touched.name && formik.errors.name) ||
                  formik.values.name != ""
                    ? `${style.inputerrorlabel}`
                    : null
                }
              >
                Name
              </label>
              {formik.touched.name && formik.errors.name ? (
                <p
                  style={{
                    color: "red",
                    fontSize: 14,
                    position: "relative",
                  }}
                >
                  {formik.errors.name}
                </p>
              ) : null}
            </div>
            <div className={style.categoryImageSection}>
              <input
                type="text"
                name="categoryImage"
                id="categoryImage"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.categoryImage}
              />
              <label
                className={
                  (formik.touched.categoryImage &&
                    formik.errors.categoryImage) ||
                  formik.values.categoryImage != ""
                    ? `${style.inputerrorlabel}`
                    : null
                }
              >
                Category Image
              </label>
              {formik.touched.categoryImage && formik.errors.categoryImage ? (
                <p
                  style={{
                    color: "red",
                    fontSize: 14,
                    position: "relative",
                  }}
                >
                  {formik.errors.categoryImage}
                </p>
              ) : null}
              <div className={style.btnLogin}>
                <button className={style.cssbuttons_io_button} type="Submit">
                  Add Category
                  <div className={style.icon}>
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryModal;
