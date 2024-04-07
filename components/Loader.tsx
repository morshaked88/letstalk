import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <AiOutlineLoading3Quarters className="text-[50px] text-white animate-spin" />
    </div>
  );
};

export default Loader;
