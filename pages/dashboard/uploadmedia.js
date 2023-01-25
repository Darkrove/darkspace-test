import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStorageUpload, Web3Button } from "@thirdweb-dev/react";
import toast, { Toaster } from "react-hot-toast";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

import { CustomButton, FormField, Loader } from "../../components";
import { secure } from "../../assets";
import { useStateContext } from "../../context";

const uploadmedia = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { address, contract, setFiles, setActivePage, uploadFile } =
    useStateContext();
  const initState = {
    filename: "",
    file: "",
    type: "",
    size: "",
    hash: "",
  };
  const [form, setForm] = useState({ initState });
  const { mutateAsync: upload } = useStorageUpload();

  const handleFormFieldChange = (fieldName, e) => {
    setForm((state) => ({ ...state, [fieldName]: e.target.value }));
  };

  const captureFile = (e) => {
    const file = e.target.files[0];
    setForm((state) => ({
      ...state,
      file: file,
      type: file.type,
      filename: file.name,
      size: file.size,
    }));
  };

  const uploadToIpfs = async () => {
    try {
      const uploadUrl = await upload({
        data: [form.file],
        options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
      });
      return uploadUrl;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.file) {
      setIsLoading(true);
      const hashUrl = await uploadToIpfs();
      if (hashUrl.message) {
        toast.error("Some error occurred!", {
          duration: 7000,
          style: {
            border: "0.5px solid #ff5252",
            background: "#1c1c24",
            borderRadius: "15px",
            padding: "10px",
            color: "#fff",
          },
          iconTheme: {
            primary: "#ff5252",
            secondary: "#fff",
          },
        });
        setIsLoading(false);
        setForm({ ...initState });
        return;
      }
      await uploadFile(
        form.filename,
        form.type,
        form.size,
        hashUrl[0].slice(7),
        session?.user.name,
        session?.user.image
      );
      setIsLoading(false);
      setForm({ ...initState });
      // setFiles((files) => [...files, hashUrl[0].slice(7)]);
      toast.success("Uploaded successfully!", {
        duration: 7000,
        style: {
          border: "0.5px solid #A855F7",
          background: "#1c1c24",
          borderRadius: "15px",
          padding: "10px",
          color: "#fff",
        },
        iconTheme: {
          primary: "#A855F7",
          secondary: "#fff",
        },
      });
      // console.table(form)
      // setActivePage("dashboard");
      // router.push("/dashboard");
    } else {
      alert("Provide valid image");
      setForm({ ...form, image: "" });
    }
  };

  return (
    <div className="">
      <Toaster position="bottom-right" reverseOrder={true} />
      {/* {isLoading && <Loader />} */}
      {address ? (
        <div>
          <div>
            <h1 className="dark:text-zinc-200 text-zinc-900 leading-none mb-3 text-[2.5rem] font-extrabold">
              Upload Media
            </h1>
            <p className="dark:text-zinc-400 text-zinc-800 m-0 leading-tight">
              Upload videos or images, and use free storage
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full mt-[20px] flex flex-col gap-[30px]"
          >
            <FormField
              labelName="Media File *"
              placeholder=""
              inputType="file"
              isFile
              handleChange={(e) => captureFile(e)}
            />
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Media Name *"
                placeholder="Camera101.jpg"
                inputType="text"
                value={form.filename}
                required
                handleChange={(e) => handleFormFieldChange("filename", e)}
              />
            </div>

            <div className="w-full flex justify-start items-center p-4 bg-violet-700 h-[120px] rounded-[10px]">
              <img
                src={secure}
                alt="secure"
                className="w-[40px] h-[40px] object-contain"
              />
              <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
                You're data will be 100% secured with us
              </h4>
            </div>

            <div className="flex justify-center items-center mt-[40px]">
              <CustomButton
                btnType="submit"
                title="Upload"
                styles="bg-violet-500 w-64"
                status={isLoading}
              />
            </div>

            {/* <Web3Button
              contractAddress="0x116ed4BF438F858E67E045459A51F9b90Fc3A21d"
              accentColor="#1dc071"
              colorMode="dark"
              action={(contract) => {
                contract.call("addFile", session?.user.name, session?.user.image, form.filename, form.size, form.type, form.hash)
              }}
            >
              upload 
            </Web3Button> */}
          </form>
        </div>
      ) : (
        <p className="text-white text-center text-3xl font-bold sm:text-4xl md:text-5xl">
          connect your wallet 🦄
        </p>
      )}

      {/* <input directory="" webkitdirectory="" type="file" onChange={(e) => {console.log(e.target.files)}}/> */}
    </div>
  );
};

export default uploadmedia;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}