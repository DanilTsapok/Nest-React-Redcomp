import React from "react";
import style from "./addCategory-style.module.scss";
import useStore from "../../../store/useStore";
import CloseIcon from "../../../assets/svg/Close.svg";
import { useFormik } from "formik";
import Logo from "../../../assets/svg/Logo.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
function AddEditProductModal() {
  const { categoryId } = useParams();
  const {
    addEditCategoryModalActive,
    setEditCategoryModalDisActive,
    selectedProduct,
    setNotificationState,
    setNotificationText,
    setNotificationStateDisabled,
  } = useStore();
  console.log(selectedProduct);
  const formik = useFormik({
    initialValues: {
      name: selectedProduct.name,
      description: selectedProduct.description,
      imgUrl: selectedProduct.imgUrl,
      price: selectedProduct.price,
      categoryId: categoryId,
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `http://localhost:4000/product/update/${selectedProduct.id}`,
          {
            name: values.name,
            description: values.description,
            imgUrl: values.imgUrl,
            price: values.price,
            categoryId: categoryId,
          }
        );
        setNotificationState();
        setTimeout(() => setNotificationStateDisabled(), 4000);
        response.status === 201 ? setNotificationText(true, "Success") : null;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (e) {
        console.log(e);
        setNotificationState();
        setNotificationText(false, "Wrong credentials");
        setTimeout(() => setNotificationStateDisabled(), 4000);
      }
    },
  });
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

        <form
          className={style.formBody}
          method="post"
          onSubmit={formik.handleSubmit}
        >
          <div className={style.logo}>
            <img src={Logo}></img>
            <h2>
              <span>Red</span>Comp
            </h2>
            <div className={style.formTitle}>
              <h2>Edit Product</h2>
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
            <div className={style.nameSection}>
              <input
                type="text"
                name="description"
                id="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              <label
                className={
                  (formik.touched.description && formik.errors.description) ||
                  formik.values.description != ""
                    ? `${style.inputerrorlabel}`
                    : null
                }
              >
                Description
              </label>
              {formik.touched.description && formik.errors.description ? (
                <p
                  style={{
                    color: "red",
                    fontSize: 14,
                    position: "relative",
                  }}
                >
                  {formik.errors.description}
                </p>
              ) : null}
            </div>
            <div className={style.nameSection}>
              <input
                type="text"
                name="imgUrl"
                id="imgUrl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.imgUrl}
              />
              <label
                className={
                  (formik.touched.imgUrl && formik.errors.imgUrl) ||
                  formik.values.imgUrl != ""
                    ? `${style.inputerrorlabel}`
                    : null
                }
              >
                imgUrl
              </label>
              {formik.touched.imgUrl && formik.errors.imgUrl ? (
                <p
                  style={{
                    color: "red",
                    fontSize: 14,
                    position: "relative",
                  }}
                >
                  {formik.errors.imgUrl}
                </p>
              ) : null}
            </div>
            <div className={style.descriptionSection}>
              <input
                type="text"
                name="price"
                id="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              <label
                className={
                  (formik.touched.price && formik.errors.price) ||
                  formik.values.price != ""
                    ? `${style.inputerrorlabel}`
                    : null
                }
              >
                Price
              </label>
              {formik.touched.price && formik.errors.price ? (
                <p
                  style={{
                    color: "red",
                    fontSize: 14,
                    position: "relative",
                  }}
                >
                  {formik.errors.price}
                </p>
              ) : null}
              <div className={style.btnLogin}>
                <button className={style.cssbuttons_io_button} type="Submit">
                  Save changes
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

export default AddEditProductModal;
