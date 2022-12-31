import React from "react";

import { loader } from "../assets";
import { FileCard } from "./";

const DisplayFiles = ({ title, isLoading, files, address, user }) => {
  const showStatus = () => {
    if (!address && !isLoading && user) {
      return (
        <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
          Wallet is not connected!! please connect your wallet 🙏 .
        </p>
      );
    } else if (!isLoading && files?.length === 0) {
      return (
        <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
          You have not uploaded any files yet
        </p>
      );
    }
  };
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({files?.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {showStatus()}

        {!isLoading &&
          files.length > 0 &&
          files.slice(0).reverse().map((file, id) => <FileCard key={id} {...file} user={user} />)}
      </div>
    </div>
  );
};

export default DisplayFiles;
