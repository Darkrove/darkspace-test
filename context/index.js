import React, { useContext, createContext, useState } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xE9db9c0A26E74f1C700e75b05079E6C4C5bb34D5"
  );
  const { mutateAsync: uploadFile } = useContractWrite(contract, "uploadFile");

  const address = useAddress();
  const connect = useMetamask();

  const [activePage, setActivePage] = useState("dashboard");
  const [files, setFiles] = useState([]);

  const publishFile = async (form, __hash) => {
    try {
      const data = await uploadFile([
        __hash,
        form.size,
        form.type,
        form.filename,
        form.description,
      ]);

      console.warn("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const retrieveFiles = async () => {
    const data = await contract.call("files",2)
    // console.table(data)
    if (data.length > 0) {
      const parsedFiles = {
        owner: data.uploader,
        name: data.fileName,
        description: data.fileDescription,
        type: data.fileType,
        size: data.fileSize.toNumber(),
        hash: data.fileHash,
        uploadTime: data.uploadTime.toNumber(),
        pId: data.fileId.toNumber(),
      };
      return parsedFiles;
    } else {
      return null
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        uploadFile: publishFile,
        retrieveFiles,
        getUserCampaigns,
        donate,
        getDonations,
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
