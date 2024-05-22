import React from "react";
import useStore from "../../../../store/useStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import style from "../auth-style.module.scss";
import Logo from "../../../../assets/svg/Logo.svg";

function RegisterForm() {
  const {
    setNotificationState,
    setNotificationStateDisabled,
    registerFormActive,
    setSwapRegisterLogin,
    setNotificationText,
  } = useStore();

  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(";").shift();
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Input email").email("Input valid email"),
      password: Yup.string().required("Input password"),
      name: Yup.string().required("Input Username"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/auth/register",
          {
            email: values.email,
            name: values.name,
            password: values.password,
          }
        );
        setNotificationState();
        setTimeout(() => setNotificationStateDisabled(), 4000);
        console.log(response.status);
        response.status === 201 ? setNotificationText(true, "Success") : null;
        // console.log(response.status);
      } catch (e) {
        setNotificationState();
        setNotificationText(false, "Email is exist");
        setTimeout(() => setNotificationStateDisabled(), 4000);
      }
    },
  });

  return (
    <div
      className={
        registerFormActive ? `${style.registBoxActive}` : `${style.registBox}`
      }
    >
      <form
        className={style.formBodyRegister}
        method="post"
        onSubmit={formik.handleSubmit}
      >
        <div className={style.logo}>
          <img src={Logo}></img>
          <h1>
            <span>Red</span>Comp
          </h1>
        </div>
        <div className={style.formTitleRegister}>
          <h1>Registration</h1>
        </div>
        <div className={style.formInfoBlock}>
          <div className={style.emailSection}>
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/laces/64/FA5252/new-post.png"
              alt="new-post"
            />

            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="**********@gmail.com"
            />
            <label
              className={
                (formik.touched.email && formik.errors.email) ||
                formik.values.email != ""
                  ? `${style.inputerrorlabel}`
                  : null
              }
            >
              Email
            </label>
            {formik.touched.email && formik.errors.email ? (
              <p
                style={{
                  color: "red",
                  fontSize: 14,
                  position: "relative",
                }}
              >
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <div className={style.NameSection}>
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/laces/64/FA5252/new-post.png"
              alt="new-post"
            />

            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="username"
            />
            <label
              className={
                (formik.touched.name && formik.errors.name) ||
                formik.values.name != ""
                  ? `${style.inputerrorlabel}`
                  : null
              }
            >
              Username
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
          <div className={style.passwordSection}>
            <img
              width="20"
              height="20"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA80lEQVR4nO1US2oCQRScnZ4iXseFAatg1h4jWxEJkguIYC4yo8lF9AS6MkGsdjFSOoYQcPxMhAR9UNB0d716Xd39ougmYkU+CngX8Jnjbd1sNn4luYDnQGaBnARgsIXHZCagW7ry4OTAMKvXK/t5jwPw6rVSJ7EtrvZ78i+RVqsagKnIcRmBD5H9Q+u2S+TiYoHc53ZBAW3v+TsCS7ImIBWg/OVkp8Ickckyjh8OCggYiZwJeBHZOws7jrlpkYD87k8+8o8w1zmiSz0/Fkfv5C6gu0WlLbr6P5DbhH8j2QnA0zkwR+Tc7aK4F5HJ1XpR9B9jA8qkV3ALoY/OAAAAAElFTkSuQmCC"
            />
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <label
              className={
                (formik.touched.password && formik.errors.password) ||
                formik.values.password != ""
                  ? `${style.inputerrorlabel}`
                  : null
              }
            >
              Password
            </label>
            {formik.touched.password && formik.errors.password ? (
              <p
                style={{
                  color: "red",
                  fontSize: 14,
                  position: "relative",
                }}
              >
                {formik.errors.password}
              </p>
            ) : null}
            <p className={style.registerLink}>
              Already have an account?
              <span onClick={() => setSwapRegisterLogin()}>Login</span>
            </p>
          </div>
        </div>
        <div className={style.btnRegister}>
          <button className={style.cssbuttons_io_button} type="Submit">
            Register
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
      </form>
    </div>
  );
}

export default RegisterForm;
