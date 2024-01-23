"use client";
import React from "react";
import useBtnStore from "../../components/store/switchButton";

const SwitchDisplayBtn = () => {
  const { button1State, button2State, toggleButton1, toggleButton2 } =
    useBtnStore();


  return (
    <div className=" m-3 flex items-center justify-center">
      <button
        onClick={toggleButton1}
        className={`${button1State &&'bg-white hover:bg-orange-400'} mx-2 text-black bg-orange-400 hover:bg-white  text-xl font-extrabold   rounded-xl shadow-xl b  px-3 py-2`}
      >
        Players
      </button>
      <button
        onClick={toggleButton2}
        className={` ${button2State &&  'bg-white hover:bg-orange-400'}  mx-2 text-black   bg-orange-400 hover:bg-white  text-xl font-extrabold   rounded-xl shadow-xl b  px-3 py-2`}
      >
        Teams
      </button>
    </div>
  );
};

export default SwitchDisplayBtn;
