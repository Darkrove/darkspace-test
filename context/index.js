import React, { useContext, createContext, useState } from "react";
import { useRouter } from "next/router";
import Web3 from "web3"
import {
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
  useContractWrite,
} from "@thirdweb-dev/react";

import { padString, unpadString } from "../utils"

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xB6213DCaE1FdE9A5C4Fd9FB29f3dc90143908B4B"
  );
  const { mutateAsync: addFile } = useContractWrite(contract, "addFile")
  const { mutateAsync: updateFileStatus } = useContractWrite(contract, "updateFileStatus")
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
  
  const publishFile = async (form, __hash, __username, __profile) => {
    try {
      const data = await addFile([
        padString(__username),
        __profile,
        padString(form.filename),
        form.size,
        padString(form.type),
        __hash,
      ]);
      console.warn("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const updateFile = async (_index, _status) => {
    try {
      const data = await updateFileStatus([ _index, _status ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const getFiles = async () => {
    const data = await contract.call("getFiles")
    if (data.length > 0) {
      const parsedFiles = data.map((file, i) => ({
        owner: file.owner,
        username: unpadString(file.username),
        profile: file.profile,
        name: unpadString(file.fileName),
        type: unpadString(file.fileType),
        size: file.fileSize.toNumber(),
        hash: file.fileHash,
        uploadTime: file.fileUploadTime.toNumber(),
        pid: file.id.toNumber(),
        status: file.fileStatus
      }));
      // console.warn(parsedFiles)
      return parsedFiles

    } else {
      return null
    }
  };

  const getPublicFiles = async () => {
    const data = await contract.call("getPublicFiles")
    console.log(data)
    if (data.length > 0) {
      const parsedFiles = data.map((file, i) => ({
        owner: file.owner,
        username: unpadString(file.username),
        profile: file.profile,
        name: unpadString(file.fileName),
        type: unpadString(file.fileType),
        size: file.fileSize.toNumber(),
        hash: file.fileHash,
        uploadTime: file.fileUploadTime.toNumber(),
        pid: file.id.toNumber(),
        status: file.fileStatus
      }));
      // console.warn(parsedFiles)
      return parsedFiles.filter(file => file.hash !== "")

    } else {
      return null
    }
  };
  
  const getUserFiles = async () => {
    const allFiles = await getFiles();

    const filteredFiles = allFiles.filter(
      (file) => file.owner === address
    );
    const fileResponse = filteredFiles.filter(
      (item) => item.status !== "delete"
    )
    return fileResponse;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        disconnect,
        contract,
        uploadFile: publishFile,
        updateFile,
        getPublicFiles,
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
