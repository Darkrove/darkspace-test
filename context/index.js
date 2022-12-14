import React, { useContext, createContext, useState } from "react";
import { useRouter } from "next/router";
import {
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
  useContractWrite,
} from "@thirdweb-dev/react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xBFb3f1E00f18362f6FDe98c74a69C971F9ab6717"
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
        name: file.name,
        description: file.description,
        type: file.fileType,
        size: file.size.toNumber(),
        hash: file.hash,
        uploadTime: file.uploadTime.toNumber(),
        pId: file.id.toNumber(),
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
