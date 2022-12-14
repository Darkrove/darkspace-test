import React from "react";

import { useStateContext } from "../../context";
import { shortenAddress } from "../../utils";

const profile = () => {
  const { address } = useStateContext();

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <p className="text-white text-center text-3xl font-bold sm:text-4xl md:text-5xl">
        Welcome, 🦄 {address ? shortenAddress(address) : ""}
      </p>
    </div>
  );
};

export default profile;
