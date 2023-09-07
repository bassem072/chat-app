import React from "react";
import LoginForm from "../Components/Auth/LoginForm";
import RegisterForm from "../Components/Auth/RegisterForm";
import Panel from "../Components/Auth/Panel";
import login from "../assets/images/login.svg";
import register from "../assets/images/register.svg";

export default function Auth() {
  return (
    <div className="w-screen h-screen text-start">
      <div className="relative w-full min-h-screen overflow-hidden c">
        <div className="absolute w-full h-full top-0 right-0">
          <div className="absolute w-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 left-3/4 delay-1000 duration-700 ease-in-out grid grid-cols-1 z-[5]">
            <RegisterForm />
            <LoginForm />
          </div>
        </div>
        <div className="absolute w-full h-full top-0 left-0 grid grid-cols-2">
          <Panel
            decoration=" pointer-events-auto pr-[17%] pl-[12%]"
            title="New here ?"
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!"
            buttonText=" Sign up"
            image={register}
          />
          <Panel
            decoration=" pointer-events-none pr-[12%] pl-[17%]"
            title="One of us ?"
            description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus et justo"
            buttonText="Sign in"
            image={login}
            trans="translate-x-[800px]"
          />
        </div>
      </div>
    </div>
  );
}
