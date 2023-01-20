import React, { useContext, createContext, useState } from "react";
import { useRouter } from "next/router";
import Web3 from "web3";
import {
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
  useContractWrite,
} from "@thirdweb-dev/react";

import { padString, unpadString, formatDate } from "../utils";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xB6213DCaE1FdE9A5C4Fd9FB29f3dc90143908B4B"
  );
  const { mutateAsync: addFile, isLoading } = useContractWrite(
    contract,
    "addFile"
  );
  const { mutateAsync: updateFileStatus } = useContractWrite(
    contract,
    "updateFileStatus"
  );
  const router = useRouter();

  const getPageName = () => {
    const path = router.asPath;
    const result = path.split("/");
    return result[result.length - 1];
  };

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const [activePage, setActivePage] = useState(getPageName());
  const [files, setFiles] = useState([]);

  const publishFile = async (
    filename,
    type,
    size,
    __hash,
    __username,
    __profile
  ) => {
    const _username = padString(__username);
    const _profile = __profile;
    const _filename = padString(filename);
    const _filesize = size;
    const _filetype = padString(type);
    const _filehash = __hash;
    try {
      const data = await addFile([
        _username,
        _profile,
        _filename,
        _filesize,
        _filetype,
        _filehash,
      ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const updateFile = async (_index, _status) => {
    try {
      const data = await updateFileStatus([_index, _status]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const getFiles = async () => {
    const data = await contract.call("getFiles");
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
        status: file.fileStatus,
      }));
      // console.warn(parsedFiles)
      return parsedFiles;
    } else {
      return null;
    }
  };

  const getPublicFiles = async () => {
    const data = await contract.call("getPublicFiles");
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
        status: file.fileStatus,
      }));
      // console.warn(parsedFiles)
      return parsedFiles.filter((file) => file.hash !== "");
    } else {
      return null;
    }
  };

  const getUserFiles = async () => {
    const allFiles = await getFiles();

    const filteredFiles = allFiles.filter(
      (file) => file.owner === address && file.status !== "delete"
    );
    return filteredFiles;
  };

  const getUserVideo = async () => {
    const allFiles = await getUserFiles();
    const fileResponse = allFiles.filter((item) => item.type !== "video/mp4");
    return fileResponse;
  };

  const getFileStats = async () => {
    const allFiles = await getUserFiles();
    const lastUpdate = formatDate(allFiles[0]?.uploadTime)

    const webCount = allFiles.reduce(
      (total, f) => (f.type === "directory" ? total + 1 : total + 0),
      0
    );
    const imageCount = allFiles.reduce(
      (total, f) => (f.type.split("/")[0] === "image" ? total + 1 : total + 0),
      0
    );
    const videoCount = allFiles.reduce(
      (total, f) => (f.type.split("/")[0] === "video" ? total + 1 : total + 0),
      0
    );
    return [lastUpdate, imageCount, videoCount, webCount];

    // return {
    //   web: webCount,
    //   image: imageCount,
    //   video: videoCount,
    // };
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
        getUserVideo,
        getFileStats,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
