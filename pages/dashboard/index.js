import React, { useState, useEffect } from "react";
import Image from "next/image";

import { useStateContext } from "../../context";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const { address, contract, retrieveFiles} = useStateContext();

  const fetchFiles = async () => {
    setIsLoading(true);
    const data = await retrieveFiles();
    setFiles(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchFiles();
  }, [address, contract]);

  return (
    <div className="text-center">
      <p className="text-white text-3xl font-bold sm:text-4xl md:text-5xl mb-5">
        Dashboard 🦄
      </p>
      <div className="flex flex-col">
        {/* {files
          ? files.map((hash, index) => (
              // <Image src={url} width="500" height="500" />
              <a className="text-lg text-white" href={`https://gateway.ipfscdn.io/ipfs/${hash}`} target="_blank" key={index}>item {hash}</a>
            ))
          : "HELLO"} */}
          {/* {console.table(files)} */}
      </div>
    </div>
  );
};

export default Home;
