import React from "react";

import { loader } from "../assets";
import { FileCard } from "./"
 
const DisplayFiles = ({ title, isLoading, files }) => {
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({files.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && files.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not uploaded any files yet
          </p>
        )}

        {!isLoading &&
          files.length > 0 &&
          files.map((file,id) => (
            <FileCard
              key={id}
              {...file}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayFiles;
