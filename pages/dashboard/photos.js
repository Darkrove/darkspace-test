import React from "react";
import { getSession } from "next-auth/react";

const photos = () => {
  return (
    <div>
      <h1 className="dark:text-zinc-200 text-zinc-900 leading-none mb-3 text-[2.5rem] font-extrabold">
        Photos
      </h1>
      <p className="dark:text-zinc-400 text-zinc-800 m-0 leading-tight">
        All photos (0)
      </p>
    </div>
  );
};

export default photos;