import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import SocialLogin from "./SocialLogin";
import { clearMessage, setMessage } from "../../slices/message";
import { login } from "../../slices/auth";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { message } = useSelector((state) => state.message);
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
          values.email
        )
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

      console.log("Hi", values, errors);

      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
      const { email, password, remember } = values;
      dispatch(login({ email, password, remember }))
        .unwrap()
        .then(() => {
          console.log(location.state);
          // if (location.state && location.state.prevRoute) {
          //   navigate(location.state.prevRoute);
          // } else {
          //   navigate("/");
          // }
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="z-[2] col-[1/2] row-[1/2]">
      <form
        className="flex items-center justify-center flex-col mb-2"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-4xl text-paragraph mb-2.5">Sign In</h2>
        <FormInput
          icon={faEnvelope}
          type="email"
          name="email"
          placeholder="Email"
          val={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorStyle={
            formik.touched.email && formik.errors.email
              ? "border-red-600"
              : "border-active"
          }
        />
        <FormInput
          icon={faLock}
          type="password"
          name="password"
          placeholder="Password"
          val={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorStyle={
            formik.touched.password && formik.errors.password
              ? "border-red-600"
              : "border-active"
          }
        />
        <FormButton disabled={isLoading ? true : false} />
        {message && (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {message}
          </div>
        )}
      </form>
      <SocialLogin />
    </div>
  );
}
