import Image from "next/image";
import Link from "next/link";
import { LinkLogo } from "../assets/Icons";

const CardBox = ({ icon, value, title }) => {
  return (
    <div
      className="bg-gradient-to-r from-neutral-700 to-zinc-700 rounded-lg shadow-xl p-4 flex flex-col justify-between gap-2"
    >
      <div
        className="text-zinc-400 flex gap-4 m-0 items-center"
      >
        {title} <LinkLogo className="w-4 h-4" />
      </div>
      <h3 className="text-zinc-200 m-0 truncate">
        {value || "-"}
      </h3>
    </div>
  );
};

export default CardBox;
