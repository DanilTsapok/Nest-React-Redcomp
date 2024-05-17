import React from "react";
import useStore from "../../../../store/useStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import style from "../auth-style.module.scss";
import Logo from "../../../../assets/svg/Logo.svg";
function LoginForm() {
  const { loginFormActive, setSwapLoginRegister } = useStore();

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
        <div className={style.logo}>
          <img src={Logo}></img>
          <h1>
            <span>Red</span>Comp
          </h1>
        </div>
        <div className={style.formTitle}>
          <h1>Login</h1>
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
              type="text"
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
          <div className={style.passwordSection}>
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
        </div>
        <div className={style.btnLogin}>
          <button className={style.cssbuttons_io_button}>
            Login
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
      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default LoginForm;
