import React from "react";
import { useSession, signOut } from "next-auth/react"
import { getSession } from "next-auth/react";

import { useStateContext } from "../../context";
import { CustomButton } from "../../components";
import { shortenAddress } from "../../utils";

const profile = () => {
  const { address } = useStateContext();
  const { data: session } = useSession();
  return (
    <div>
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        <p className="text-white text-center text-3xl font-bold sm:text-4xl md:text-5xl">
          Welcome, 🦄 {session?.user.name}
        </p>
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Sign Out 🚀"
            styles="bg-[#1dc071] w-64"
            handleClick={() => signOut()}
          />
        </div>
      </div>
    </div>

  );
};

export default profile;

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