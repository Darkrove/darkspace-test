import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContract, useContractRead } from "@thirdweb-dev/react";

import { useStateContext } from "../../../context";
import { CountBox, CardBox } from "../../../components";
import { capitalizeFirstLetter, formatDate, formatBytes } from "../../../utils";

const index = (props) => {
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { address, contract, getFileByHash } = useStateContext();
  const router = useRouter();
  const { slug } = router.query;

  const fetchFile = async () => {
    try {
      const data = await getFileByHash(slug);
      console.log(data);
      if (data) setFile(data[0]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract && isLoading) fetchFile();
  });
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
          <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
          <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
        </div>
      ) : (
        <>
          <div className="mt-[30px] flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase"></h4>
                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <img
                      src={file?.profile}
                      alt="user"
                      className="object-fill rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                      {file?.username}
                    </h4>
                    <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                      10 Campaigns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
            <div className="flex-1 flex-col">
              <img
                src={`https://ipfs.io/ipfs/${file?.hash}`}
                alt="campaign"
                className="w-full h-[410px] object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
            <CardBox title={"Name"} value={file?.name} />
            <CardBox title={"Hash"} value={file?.hash} />
            <CardBox title={"Size"} value={formatBytes(file?.size)} />
            <CardBox title={"Publish"} value={formatDate(file?.uploadTime)} />
            <CardBox title={"Link"} value={"dfwefwefwefwefwef"} />
          </div>
        </>
      )}
    </div>
  );
};

export default index;
