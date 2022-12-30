import React from "react";
import { getSession } from "next-auth/react";

const photos = () => {
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <p className="text-white text-center text-3xl font-bold sm:text-4xl md:text-5xl">
        photos 🦄
      </p>
    </div>
  );
};

export default photos;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}