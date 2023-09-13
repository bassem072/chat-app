import React, { useEffect } from "react";
import FormInput from "./FormFields/FormInput";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import FormButton from "./FormFields/FormButton";
import SocialLogin from "./SocialLogin";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setMessage } from "../../../slices/message";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { register } from "../../../slices/auth";
import {
  current_day,
  current_month,
  current_year,
} from "../../../helpers/dates";
import SelectField from "./FormFields/SelectField";
import RadioField from "./FormFields/RadioField";
import validate from "../../../services/validation/register";

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { message } = useSelector((state) => state.message);
  const { isLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message) {
      toast(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(clearMessage());
  }, [dispatch, message]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      day: current_day,
      month: current_month + 1,
      year: current_year,
      gender: 0,
    },
    validate,
    onSubmit: (values) => {
      const g = ["male", "female"];
      let date = new Date(
        values.year + "-" + (values.month + 1) + "-" + values.day
      );
      dispatch(setMessage(""));
      const { name, email, password, gender } = values;
      const userData = {
        name,
        email,
        password,
        gender: g[gender],
        birthday: date,
      };
      dispatch(register(userData))
        .unwrap()
        .then(() => {
          console.log("Hi", location.state, user);
          if (location.state && location.state.prevRoute) {
            navigate(location.state.prevRoute);
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
  });
  return (
    <div className=" z-[1] col-[1/2] row-[1/2] opacity-0">
      <form
        className="flex items-center justify-center flex-col mb-2"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-4xl text-paragraph mb-2.5">Sign In</h2>
        <FormInput
          icon={faUser}
          type="text"
          name="name"
          placeholder="Name"
          val={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          condition={formik.touched.name && formik.errors.name}
          error={formik.errors.name}
        />
        <FormInput
          icon={faEnvelope}
          type="email"
          name="email"
          placeholder="Email"
          val={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          condition={formik.touched.email && formik.errors.email}
          error={formik.errors.email}
        />
        <FormInput
          icon={faLock}
          type="password"
          name="password"
          placeholder="Password"
          val={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          condition={formik.touched.password && formik.errors.password}
          error={formik.errors.password}
        />
        <FormInput
          icon={faLock}
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          val={formik.values.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          condition={
            formik.touched.repeatPassword && formik.errors.repeatPassword
          }
          error={formik.errors.repeatPassword}
        />
        <SelectField
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          dayVal={formik.values.day}
          monthVal={formik.values.month}
          yearVal={formik.values.year}
          error={formik.errors.date}
        />
        <RadioField
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          title="Gender"
          currentVal={formik.values.gender}
          condition={formik.touched.gender && formik.errors.gender}
          error={formik.errors.gender}
        />
        <FormButton name="Register" disabled={isLoading ? true : false} />
      </form>
      <SocialLogin />
    </div>
  );
}
