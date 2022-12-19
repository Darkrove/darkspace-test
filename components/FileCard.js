import React, { useState } from "react";
import Image from "next/image";

import { tagType, thirdweb } from "../assets";

const FileCard = ({
  description,
  hash,
  name,
  owner,
  pId,
  size,
  type,
  uploadTime,
  handleClick,
}) => {
  const customLoader = ({ src, width, quality }) => {
    return `https://s3.amazonaws.com/demo/image/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer">
      <div className="w-full overflow-hidden rounded-[15px]">
        <Image
          src={`https://gateway.ipfscdn.io/ipfs/${hash}`}
          alt="image"
          width={400}
          height={300}
          loading="lazy"
          onLoadingComplete={() => setIsLoading(false)}
          className={
            "duration-700 ease w-full h-[158px] object-cover rounded-[15px]" +
            (isLoading ? "scale-110 grayscale blur-2xl" : "scale-100 blur-0 grayscale-0")
          }
        />
      </div>
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Education
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {name}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        {/* <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div> */}

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
