import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]";
import { useStateContext } from "../../context";
import { CustomButton, StatsCard, ProfileCard, Stats } from "../../components";
import { shortenAddress } from "../../utils";
import { imageIcon, videoIcon, hostIcon } from "../../assets";

const profile = () => {
  const { address, contract, getFileStats } = useStateContext();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState();
  const [webCount, setWebCount] = useState();
  const [imageCount, setImageCount] = useState();
  const [videoCount, setVideoCount] = useState();
  const [host, setHost] = useState();

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
    console.log(counts);
    setLastUpdate(counts[0]);
    setImageCount(counts[1]);
    setVideoCount(counts[2]);
    setWebCount(counts[3]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (address && contract) fetchStats();
    if (session?.user?.email) {
      const split = session?.user?.image?.split("/");
      const host = split[2]?.split(".")[1];
      console.log(host)
      if (host === "githubusercontent") {
        setHost("github");
      } else if (host === "googleusercontent") {
        setHost("google");
      }
    }
  }, [address, contract]);

  return (
    <div>
      <div className="flex justify-center items-center flex-col rounded-[10px]">
        <div className="w-full flex flex-col items-center relative">
          <section className="flex flex-col w-full justify-between lg:mt-0 md:mt-0 prose prose-a:no-underline gap-6">
            <div>
              <h1 className="dark:text-zinc-200 text-zinc-900 leading-none mb-3 text-[2.5rem] font-extrabold">
                Profile
              </h1>
              <p className="dark:text-zinc-400 text-zinc-800 m-0 leading-tight">
                Random stats and stuff related to you.
              </p>
            </div>
            <ProfileCard host={host} user={session?.user} />
            <Stats
              lastUpdate={lastUpdate}
              imageCount={imageCount}
              videoCount={videoCount}
              webCount={webCount}
              address={address}
            />
          </section>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default profile;

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
