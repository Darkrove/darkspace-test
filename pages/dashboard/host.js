import React, { useState, useEffect } from "react";
import { NFTStorage, File, Blob } from "nft.storage";
import { useStorageUpload, Web3Button } from "@thirdweb-dev/react";
import { useSession, getSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

import { FolderUpload, CustomButton, DisplayTable, Snackbar } from "../../components";
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

  // const handleSubmit = async () => {
  //   console.warn(selectedFiles);
  //   console.log(selectedFiles.reduce((total, f) => total + f.size, 0));
  // };

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
    const size = myFiles.reduce((total, f) => total + f.size, 0)
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
      toast.success("Deployed successfully!", {
        duration: 7000,
        style: {
          border: "0.5px solid #A855F7",
          background: '#1c1c24',
          borderRadius: '15px',
          padding: "10px",
          color: "#fff",
        },
        iconTheme: {
          primary: "#A855F7",
          secondary: "#fff",
        },
      });
    } catch (error) {
      console.log(error);
      toast.success("Error occurred!", {
        duration: 7000,
        style: {
          border: "0.5px solid #A855F7",
          background: '#1c1c24',
          borderRadius: '15px',
          padding: "10px",
          color: "#fff",
        },
        iconTheme: {
          primary: "#A855F7",
          secondary: "#fff",
        },
      });
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={true} />
      {/* <Snackbar/> */}
      <div className="bg-gray-700 rounded-[10px] sm:p-10 p-4">
        <p className="text-white text-center text-3xl font-bold sm:text-4xl md:text-5xl">
          host your static websites 🌎
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

      {/* <div>
        <ol className="grid grid-cols-4 gap-3 text-white">
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ol>
      </div> */}
      <div className="mt-5">
        <DisplayTable
          title=""
          files={files.filter((file) => file.type === "directory")}
          address={address}
          user={true}
          isLoading={dataLoading}
        />
      </div>
    </div>
  );
};

export default viewfiles;

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/signin",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }
