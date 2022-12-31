import React, { useContext, createContext, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers"; 
import Web3 from "web3"
import {
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
  useContractWrite,
} from "@thirdweb-dev/react";

const StateContext = createContext();
const utils = ethers.utils
const web3 = new Web3();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xb8Ca9c51f57114410a8748E73817740c9E8Ab066"
  );
  const { mutateAsync: createFile, isLoading } = useContractWrite(contract, "createFile")
  const router = useRouter()

  const getPageName = () => {
    const path = router.asPath
    const result = path.split('/')
    return result[result.length-1]
  }

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const [activePage, setActivePage] = useState(getPageName());
  const [files, setFiles] = useState([]);

  const publishFile = async (form, __hash) => {
    try {
      const data = await createFile([
        form.filename,
        form.description,
        form.size,
        form.type,
        __hash,
      ]);

      console.warn("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getFiles = async () => {
    const data = await contract.call("getFiles")
    // console.warn(data)
    if (data.length > 0) {
      const parsedFiles = data.map((file, i) => ({
        owner: file.owner,
        username: web3.utils.toAscii(file.username).replace(/\0/g, ''),
        profile: file.profile,
        name: web3.utils.toAscii(file.fileName).replace(/\0/g, ''),
        type: web3.utils.toAscii(file.fileType).replace(/\0/g, ''),
        size: file.fileSize.toNumber(),
        hash: file.fileHash,
        uploadTime: file.fileUploadTime.toNumber(),
        pid: file.id.toNumber(),
      }));
      // console.warn(parsedFiles)
      return parsedFiles;
    } else {
      return null
    }
  };

  const getUserFiles = async () => {
    const allFiles = await getFiles();

    const filteredFiles = allFiles.filter(
      (file) => file.owner === address
    );

    return filteredFiles;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        disconnect,
        contract,
        uploadFile: publishFile,
        getFiles,
        getUserFiles,
        activePage,
        setActivePage,
        files,
        setFiles,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
