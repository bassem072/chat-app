import React from "react";
import FormInput from "./FormInput";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import FormButton from "./FormButton";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
  return (
    <div className="opacity-0 z-[1] col-[1/2] row-[1/2]">
      <form className="flex items-center justify-center flex-col mb-2">
        <h2 className="text-4xl text-paragraph mb-2.5">Sign In</h2>
        <FormInput
          icon={faUser}
          type="text"
          name="name"
          placeholder="Name"
          val=""
          onChange={() => {}}
        />
        <FormInput
          icon={faEnvelope}
          type="email"
          name="email"
          placeholder="Email"
          val=""
          onChange={() => {}}
        />
        <FormInput
          icon={faLock}
          type="password"
          name="password"
          placeholder="Password"
          val=""
          onChange={() => {}}
        />
        <FormInput
          icon={faLock}
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          val=""
          onChange={() => {}}
        />
        <FormButton />
      </form>
      <SocialLogin />
    </div>
  );
}
