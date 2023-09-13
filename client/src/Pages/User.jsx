import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";

export default function User() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const logoutEvent = async () => {
    dispatch(logout()).unwrap()
        .then(() => {
          window.location.reload();
        });
  };

  return (
    <div>
      {Object.values(user.user).map((item) => (
        <div key={item}>{item}</div>
      ))}
      <button onClick={() => logoutEvent()}>Logout</button>
    </div>
  );
}
