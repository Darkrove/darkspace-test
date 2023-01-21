import Link from "next/link";
import { LinkLogo } from "../assets/Icons";
import { useState, useEffect } from "react";
import { useStateContext } from "../context";
export default function Stats({lastUpdate, imageCount, videoCount, webCount, address}) {

  const {setActivePage} = useStateContext();

  const diffCalc = () => {
    const diff =
      (new Date().getTime() - new Date("November 11, 2000").getTime()) /
      1000 /
      60 /
      60 /
      24 /
      365;
    return diff.toFixed(9);
  };

  const [age, setAge] = useState(diffCalc());
  const [mounted, setMounted] = useState(false);

  setInterval(() => {
    setAge(diffCalc());
  }, 10);

  useEffect(() => {
    setMounted(true);
  }, []);

  const statCards = [
    {
      title: "My Age",
      value: age,
      link: "",
      active: "profile"
    },
    {
      title: "Wallet Address",
      value: address,
      link: "",
      active: "profile"
    },
    {
      title: "Image Count",
      value: imageCount,
      link: "/dashboard/photos",
      active: "photos",
    },
    {
      title: "Video Count",
      value: videoCount,
      link: "/dashboard/videos",
      active: "videos",
    },
    {
      title: "Website Count",
      value: webCount,
      link: "/dashboard/host",
      active: "host",
    },
    {
      title: "Last Upload",
      value: lastUpdate,
      link: "/dashboard/recent",
      active: "recent",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
      {mounted &&
        statCards.map((card, index) => {
          return (
            <div
              className="dark:bg-gradient-to-r dark:from-neutral-700 dark:to-zinc-700 bg-gradient-to-r from-neutral-200 to-zinc-200 rounded-lg shadow-xl p-4 flex flex-col justify-between gap-2"
              key={index}
            >
              <Link
                className="text-zinc-700 dark:text-zinc-400 flex gap-4 m-0 items-center"
                href={card.link}
                rel="noreferrer"
                onClick={()=>setActivePage(card.active)}
              >
                {card.title} <LinkLogo className="w-4 h-4 fill-current" />
              </Link>
              <h3 className="text-zinc-900 dark:text-zinc-200 m-0">
                {card.value || "-"}
              </h3>
            </div>
          );
        })}
    </div>
  );
}
