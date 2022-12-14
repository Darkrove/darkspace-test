import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { navlinks } from "../constants";
import { logo, sun, logout } from "../assets";
import { useStateContext } from "../context";
import { ToolTip } from "./";

const Icon = ({ styles, name, imgUrl, activePage, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      activePage && activePage === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!activePage ? (
      <Image
        width={50}
        height={50}
        src={imgUrl}
        alt="logo"
        loading="lazy"
        className="w-1/2 h-1/2"
      />
    ) : (
      <Image
        width={50}
        height={50}
        src={imgUrl}
        alt="logo"
        loading="lazy"
        className={`w-1/2 h-1/2 hover:grayscale-0 ${
          activePage !== name && "grayscale"
        }`}
      />
    )}
  </div>
);

const Sidebar = () => {
  // const [activePage, setactivePage] = useState("dashboard");
  const { activePage, setActivePage, disconnect, address } = useStateContext();
  const router = useRouter();

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 z-10 h-[93vh]">
      <Link onClick={() => setActivePage("dashboard")} href="/dashboard">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <ToolTip tip={link.tip}>
              <Icon
                key={link.name}
                {...link}
                activePage={activePage}
                handleClick={() => {
                  if (!link.disabled) {
                    setActivePage(link.name);
                    router.push(link.link);
                  }
                }}
              />
            </ToolTip>
          ))}
          {address ? (
            <ToolTip tip="Logout">
              <Icon
                styles="grayscale hover:grayscale-0"
                name="logout"
                imgUrl={logout}
                handleClick={disconnect}
              />
            </ToolTip>
          ) : (
            ""
          )}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
