import React from "react";
import useStore from "../../../../store/useStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import style from "../auth-style.module.scss";
function LoginForm() {
  const {
    loginFormActive,
    setSwapLoginRegister,
    SetNotificationStateLogin,
    notificationStateLogin,
  } = useStore();

  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(";").shift();
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Input email").email("Input valid email"),
      password: Yup.string().required("Input password"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://127.0.0.1:4000/auth/login", {
          email: values.email,
          password: values.password,
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div
      className={
        loginFormActive ? `${style.loginBox}` : `${style.loginBoxActive}`
      }
    >
      <form
        className={style.formBody}
        method="post"
        onSubmit={formik.handleSubmit}
      >
        <div className={style.formTitle}>
          <h1>Login</h1>
        </div>
        <div className={style.formInfoBlock}>
          <div className={style.emailSection}>
            <img src="" alt="" />
            <input
              type="text"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
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
          <div className={style.passwordSection}>
            <img src="" alt="" />
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
          </div>
          <button type="Submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
