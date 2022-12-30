import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getSession } from "next-auth/react";

import { useStateContext } from "../../context";
import { DisplayFiles } from "../../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const { address, contract, getFiles } = useStateContext();

  const fetchFiles = async () => {
    setIsLoading(true);
    const data = await getFiles();
    setFiles(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchFiles();
  }, [address, contract]);

  return (
    <div className="scroll-smooth text-center">
      <p className="text-white text-3xl font-bold sm:text-4xl md:text-4xl mb-5">
        Dashboard 🦄
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

export async function getServerSideProps({ req }){
  const session = await getSession({ req })

  if(!session){
    return {
      redirect : {
        destination: '/signin',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}