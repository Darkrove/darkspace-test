import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { ConnectWallet } from "@thirdweb-dev/react";

import { CustomButton } from "./";
import { navlinks } from "../constants";
import { useStateContext } from "../context";
import { logo, menu, search, thirdweb } from "../assets";

const Navbar = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address, activePage, setActivePage } = useStateContext();

  const router = useRouter();
  const push = () => {
    setActivePage("uploadMedia");
    router.push("/dashboard/uploadmedia");
    setToggleDrawer(false);
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className=" lg:flex-1 flex flex-row lg:max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] ">
        <input
          type="text"
          placeholder="Search for images"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <Image
            width="50"
            height="50"
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        {/* <CustomButton
          btnType="button"
          title={address ? "Upload" : "Connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) push();
            else connect();
          }}
        /> */}
        <ConnectWallet className="rounded-[100px]" accentColor="#1c1c24" colorMode="dark" />
        <Link
          onClick={() => setActivePage("profile")}
          href="/dashboard/profile"
        >
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <Image
              width="50"
              height="50"
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <Link onClick={() => setActivePage("dashboard")} href="/dashboard">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <Image
              width="50"
              height="50"
              src={logo}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>

        <Image
          width="50"
          height="50"
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[200vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  activePage === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setActivePage(link.name);
                  setToggleDrawer(false);
                  router.push(link.link);
                }}
              >
                <Image
                  width="50"
                  height="50"
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    activePage === link.name ? "grayscale-0" : "grayscale"
                  }`}c
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    activePage === link.name
                      ? "text-[#1dc071]"
                      : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            {/* <CustomButton
              btnType="button"
              title={address ? "Upload" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) push();
                else connect();
              }}
            /> */}
            <ConnectWallet accentColor="#1dc071" colorMode="dark" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
