import React, { useState, useEffect } from "react";
import Image from "next/image";

import { useStateContext } from "../../context";
import { DisplayFiles } from "../../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const { address, contract, getFiles, getUserFiles } = useStateContext();

  const fetchFiles = async () => {
    setIsLoading(true);
    const data = await getFiles();
    setFiles(data);
    console.warn(data);
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
        title="All Files"
        isLoading={isLoading}
        files={files}
      />
    </div>
  );
};

export default Home;
