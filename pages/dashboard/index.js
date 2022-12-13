import React from "react";
import Image from "next/image";

import { useStateContext } from "../../context";

const Home = () => {
  const { files } = useStateContext();
  return (
    <div className="text-center">
      <p className="text-white text-3xl font-bold sm:text-4xl md:text-5xl mb-5">
        Dashboard 🦄
      </p>
      <div className="flex flex-col">
        {files
          ? files.map((url, index) => (
              // <Image src={url} width="500" height="500" />
              <a className="text-lg text-white" href={url} target="_blank" key={index}>item 1</a>
            ))
          : "HELLO"}
      </div>
    </div>
  );
};

export default Home;
