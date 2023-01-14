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
    try {
      const data = await getPublicFiles();
      setFiles(data);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      setIsLoading(true);
      fetchFiles();
      // toast.promise(
      //   fetchFiles(),
      //   {
      //     loading: "Loading...",
      //     success: <b>Loaded successfully!</b>,
      //     error: <b>Could not Load.</b>,
      //   },
      //   {
      //     style: {
      //       border: "0.5px solid #A855F7",
      //       background: "#1c1c24",
      //       borderRadius: "15px",
      //       padding: "10px",
      //       color: "#fff",
      //     },
      //     iconTheme: {
      //       primary: "#A855F7",
      //       secondary: "#fff",
      //     },
      //   }
      // );
    }
  }, []);

  return (
    <div className="scroll-smooth text-center">
      <Toaster position="bottom-right" reverseOrder={true} />
      <p className="text-white text-3xl font-bold sm:text-4xl md:text-4xl mb-5">
        Global 🦄
      </p>
      <DisplayFiles
        title="All files"
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
