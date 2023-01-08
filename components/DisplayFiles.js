import React from "react";

import { loader } from "../assets";
import { FileCard } from "./";

const DisplayFiles = ({ title, isLoading, files, address, user }) => {
  const showStatus = () => {
    if (!address && !isLoading && user) {
      return (
        <p className="font-epilogue font-semibold text-[16px] leading-[30px] text-[#818183]">
          Wallet is not connected!! please connect your wallet 🙏
        </p>
      );
    } else if (!isLoading && files?.length === 0) {
      return (
        <p className="font-epilogue font-semibold text-[16px] leading-[30px] text-[#818183]">
          Oops!! nothing to show 😬
        </p>
      );
    }
  };
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({files?.length})
      </h1>
      {isLoading && (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
          <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
          <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
        </div>
      )}
      {showStatus()}
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {!isLoading &&
          files.length > 0 &&
          files
            .slice(0)
            .reverse()
            .map((file, id) => <FileCard key={id} {...file} user={user} />)}
      </div>
    </div>
  );
};

export default DisplayFiles;
