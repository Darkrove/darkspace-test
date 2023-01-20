import { LinkLogo } from "../assets/Icons";
import { useState, useEffect } from "react";

export default function Stats({lastUpdate, imageCount, videoCount, webCount}) {
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
      link: "https://asrvd.me/about",
    },
    {
      title: "Image Count",
      value: imageCount,
      link: "https://github.com/asrvd",
    },
    {
      title: "Video Count",
      value: videoCount,
      link: "https://github.com/asrvd?tab=followers",
    },
    {
      title: "Website Count",
      value: webCount,
      link: "https://last.fm/user/asheeshh",
    },
    {
      title: "Last Upload",
      value: lastUpdate,
      link: "https://u.asrvd.me/share/DMvDSMzs/personal%20site",
    },
    {
      title: "Coding Hours",
      value: "10",
      link: "https://wakatime.com/@asheeshh",
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
              <a
                className="text-zinc-700 dark:text-zinc-400 flex gap-4 m-0 items-center"
                href={card.link}
                target="_blank"
                rel="noreferrer"
              >
                {card.title} <LinkLogo className="w-4 h-4 fill-current" />
              </a>
              <h3 className="text-zinc-900 dark:text-zinc-200 m-0">
                {card.value || "-"}
              </h3>
            </div>
          );
        })}
    </div>
  );
}
