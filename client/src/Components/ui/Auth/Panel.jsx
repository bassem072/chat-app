import React from "react";

export default function Panel({
  decoration,
  title,
  description = "",
  buttonText,
  image,
  trans = "",
}) {
  return (
    <div
      className={
        "flex flex-col justify-around items-end text-center z-[6] pt-12 pb-8 " +
        decoration
      }
    >
      <div className={"text-paragraph transition-transform duration-1000 ease-in-out delay-700 " + trans}>
        <h3 className="font-semibold leading-none text-2xl">{title}</h3>
        <p className="text-base py-3">{description}</p>
        <button className="m-0 bg-none border-2 border-paragraph w-32 h-10 font-semibold text-sm">{buttonText}</button>
      </div>
      <img
        src={image}
        alt={title}
        className={"w-full duration-[1.1s] ease-in-out delay-[.4s] " + trans}
      />
    </div>
  );
}
