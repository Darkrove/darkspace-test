import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]";
import { useStateContext } from "../../context";
import { DisplayFiles } from "../../components";
import { fetchData } from "next-auth/client/_utils";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [isToast, setIsToast] = useState(false);
  const { address, contract, getPublicFiles } = useStateContext();

  const fetchFiles = async () => {
    setIsLoading(true);
    const data = await getPublicFiles();
    setFiles(data.reverse());
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchFiles();
  }, [address, contract]);

  return (
    <div className="scroll-smooth">
      <Toaster position="bottom-right" reverseOrder={true} />
      <DisplayFiles
        title="Global"
        subtitle="All files"
        isLoading={isLoading}
        files={files}
        address={address}
        user={false}
      />
    </div>
  );
};

export default Home;

// export async function getServerSideProps({ req }){
//   const session = await getSession({ req })

//   if(!session){
//     return {
//       redirect : {
//         destination: '/signin',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: { session }
//   }
// }

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
