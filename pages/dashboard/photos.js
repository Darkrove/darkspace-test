import React from "react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

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