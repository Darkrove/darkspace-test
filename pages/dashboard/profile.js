import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";

import { useStateContext } from "../../context";
import { CustomButton } from "../../components";
import { shortenAddress } from "../../utils";
import { image } from "../../assets";

const profile = () => {
  const { address, contract, getFileStats } = useStateContext();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [webCount, setWebCount] = useState();
  const [imageCount, setImageCount] = useState();
  const [videoCount, setVideoCount] = useState();

  const showStatus = () => {
    if (!address && !isLoading) {
      return (
        <p className="flex items-center justify-center space-x-2 font-epilogue font-semibold text-[16px] leading-[30px] text-[#818183]">
          Wallet is not connected!! please connect your wallet 🙏
        </p>
      );
    }
  };

  const fetchStats = async () => {
    setIsLoading(true);
    const counts = await getFileStats();
    console.log(counts)
    setImageCount(counts[0]);
    setVideoCount(counts[1]);
    setWebCount(counts[2]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchStats();
  }, [webCount, contract]);

  return (
    <div>
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        <div class="lg:w-8/12 lg:mx-auto mb-8">
          <header class="flex flex-wrap items-center p-4 md:py-8">
            <div class="md:w-3/12 md:ml-16">
              {/* <!-- profile image --> */}
              <img
                class="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full
                     border-2 border-violet-500 p-1"
                src={session?.user.image}
                alt="profile"
              />
            </div>

            {/* <!-- profile meta --> */}
            <div class="w-8/12 md:w-7/12 ml-4">
              <div class="md:flex md:flex-wrap md:items-center mb-4">
                <h2 class="text-white text-center text-2xl sm:text-3xl md:text-4xl inline-block font-bold md:mr-2 mb-2 sm:mb-0">
                  {session?.user.name}#🦄
                </h2>

                {/* <!-- badge --> */}
                <span
                  class="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6 text-xl transform -translate-y-2"
                  aria-hidden="true"
                >
                  <i
                    class="fas fa-check text-white text-xs absolute inset-x-0
                               ml-1 mt-px"
                  ></i>
                </span>
              </div>

              <div>
                <p className="text-xl font-semibold text-white">
                  {session?.user.email}
                </p>
              </div>
            </div>
          </header>
          <div class=" border-t border-violet-500 p-4 md:py-8 ">
            {isLoading && (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
                <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
                <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
              </div>
            )}
            {showStatus()}
            {!isLoading && address && (
              <ul className="flex justify-around text-lg space-x-4 text-center text-white leading-snug">
                <li>
                  <span class="font-semibold text-white block">{imageCount? imageCount : 0}</span>
                  images
                </li>

                <li>
                  <span class="font-semibold text-white block">{videoCount? videoCount : 0}</span>
                  videos
                </li>
                <li>
                  <span class="font-semibold text-white block">{webCount? webCount : 0}</span>
                  websites
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center mt-[40px] w-">
          <CustomButton
            btnType="submit"
            title="Sign Out"
            styles="bg-violet-500 w-80"
            handleClick={() => signOut()}
          />
        </div>
      </div>
    </div>
  );
};

export default profile;

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/signin",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }
