import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "../../api/auth/[...nextauth]";

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
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase"></h4>
                <div className="flex flex-row items-center flex-wrap gap-[14px]">
                  <div className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <Image
                      src={file?.profile}
                      alt="user"
                      width={100}
                      height={100}
                      className="object-fill rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                      {file?.username}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex md:flex-row flex-col mt-4 gap-[30px]">
            <div className="flex-1 flex-col">
              <Image
                src={`https://ipfs.io/ipfs/${file?.hash}`}
                alt="campaign"
                width={800}
                height={600}
                className="w-full h-[410px] object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
            <CardBox title={"Name"} value={file?.name} />
            <CardBox title={"Hash"} value={file?.hash} />
            <CardBox title={"Size"} value={formatBytes(file?.size)} />
            <CardBox title={"Publish"} value={formatDate(file?.uploadTime)} />
            <CardBox title={"Link"} value={`https://ipfs.io/ipfs/${file?.hash}`} />
          </div>
        </>
      )}
    </div>
  );
};

export default index;
export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
