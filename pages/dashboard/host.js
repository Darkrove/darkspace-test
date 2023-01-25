import React, { useState, useEffect } from "react";
import { NFTStorage, File, Blob } from "nft.storage";
import { useStorageUpload, Web3Button } from "@thirdweb-dev/react";
import { useSession, getSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

import {
  FolderUpload,
  CustomButton,
  DisplayTable,
  Snackbar,
} from "../../components";
import { useStateContext } from "../../context";

const viewfiles = () => {
  const { data: session } = useSession();
  const { mutateAsync: upload } = useStorageUpload();

  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const { address, contract, getUserFiles, uploadFile } = useStateContext();

  const fetchFiles = async () => {
    setDataLoading(true);
    const data = await getUserFiles();
    setFiles(data);
    setDataLoading(false);
  };

  useEffect(() => {
    if (contract) fetchFiles();
  }, [address, contract]);

  const handleChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_STORAGE_API;
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
    const myFiles = [];

    Array.from(selectedFiles).forEach((file) => {
      const blob = new Blob([file]);
      const res = new File([file], file.name, { type: file.type });
      myFiles.push(res);
    });
    const folderName = selectedFiles[0].webkitRelativePath.split("/");
    const size = myFiles.reduce((total, f) => total + f.size, 0);
    console.log(myFiles);
    try {
      const cid = await client.storeDirectory(myFiles);
      await uploadFile(
        folderName[0].toLowerCase(),
        "directory",
        size,
        cid,
        session?.user.name,
        session?.user.image
      );
      console.log(cid);
      toast.success("Deployed successfully!");
    } catch (error) {
      console.log(error);
      toast.success("Error occurred!");
    }
    setIsLoading(false);
  };

  return (
    <div>
      {/* <Snackbar/> */}
      <div>
        <h1 className="dark:text-zinc-200 text-zinc-900 leading-none mb-3 text-[2.5rem] font-extrabold">
          Website Hosting
        </h1>
        <p className="dark:text-zinc-400 text-zinc-800 m-0 leading-tight">
          Host your static websites freely
        </p>
      </div>
      <FolderUpload handleChange={handleChange} />
      <div className="mt-5 flex flex-row justify-center">
        <CustomButton
          btnType="submit"
          styles="bg-violet-500 w-72"
          title="Deploy"
          handleClick={handleSubmit}
          status={isLoading}
        />
      </div>
      <div className="mt-5">
        <DisplayTable
          title=""
          files={files?.filter((file) => file.type === "directory")}
          address={address}
          user={true}
          isLoading={dataLoading}
        />
      </div>
    </div>
  );
};

export default viewfiles;
