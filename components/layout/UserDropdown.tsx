import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import Popover from "../shared/Popover";
import Image from "next/image";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "../../lib/constants";

export default function UserDropdown({onProfileClick}) {
  const { data: session } = useSession();
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  return (
    <motion.div
      className="relative overflow-hidden inline-block text-left z-30"
      {...FADE_IN_ANIMATION_SETTINGS}
    >
      <Popover
        content={
          <div className="w-full rounded-md bg-zinc-800 border-0 p-2 sm:w-56">
            <Link
              className="flex flex-row items-center justify-start text-zinc-200 space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-zinc-600"
              href="/dashboard/profile"
              onClick={onProfileClick}
            >
              <User className="h-4 w-4" color="currentColor"/>
              <p className="text-sm ">Profile</p>
            </Link>
            {/* <button
              className="relative flex w-full cursor-not-allowed items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              disabled
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </button> */}
            <button
              className="relative flex flex-row w-full items-center justify-start text-zinc-200 space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-zinc-600"
              onClick={() => signOut({ redirect: true })}
            >
              <LogOut className="h-4 w-4" color="currentColor"/>
              <p className="text-sm ">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex flex-row w-[100%] h-[100%] items-center justify-center overflow-hidden rounded-full transition-all duration-75 focus:outline-none active:scale-95"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={50}
            height={50}
            className="object-fill"
          />
        </button>
      </Popover>
    </motion.div>
  );
}