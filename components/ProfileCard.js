import { GoogleLogo, GithubLogo } from "../assets/Icons"
import { capitalizeFirstLetter } from "../utils";

export default function ProfileCard({host, user}) {
  return (
    <div className="bg-gradient-to-r from-neutral-700 to-zinc-700  rounded-lg shadow-xl p-4 flex justify-between gap-2">
      <div className="flex flex-col justify-between gap-2">
        <p
          // className={clsx({
          //   "dark:text-zinc-400 text-zinc-600 m-0 text-xs lg:text-sm md:text-sm":
          //     data?.discord_status === "offline" || !data?.discord_status,
          //   "dark:text-green-400 text-green-600 m-0 text-xs lg:text-sm md:text-sm":
          //     data?.discord_status === "online",
          //   "dark:text-yellow-400 text-yellow-600 m-0 text-xs lg:text-sm md:text-sm":
          //     data?.discord_status === "idle",
          //   "dark:text-red-400 text-red-600 m-0 text-xs lg:text-sm md:text-sm":
          //     data?.discord_status === "dnd",
          // })}
          className="text-zinc-400 text-xs lg:text-sm md:text-sm"
        >
          {host === 'github' && <GithubLogo className="inline-block mr-2 w-4 h-4" />}{" "}
          {host === 'google' && <GoogleLogo className="inline-block mr-2 w-4 h-4" />}{" "}
          
          {user?.email}
        </p>
        <div className="flex gap-2 lg:gap-4 md:gap-3 text-sm lg:text-base md:text-base text-zinc-200 w-full">
          <p className="m-0">
            {capitalizeFirstLetter(user?.name)}
          </p>
        </div>
      </div>
      <div className="h-16 w-16 lg:h-20 lg:w-20 md:w-20 md:h-20 justify-center items-center flex">
        <img
          className="rounded-lg object-fit shadow-lg"
          src={user?.image}
          alt={user?.name}
        />
      </div>
    </div>
  );
}