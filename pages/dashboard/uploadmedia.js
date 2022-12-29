import React, { useState, useReducer } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// import { ethers } from "ethers";
import { useStorageUpload } from "@thirdweb-dev/react";

import {
  CustomButton,
  FormField,
  Loader,
  DropFileInput,
} from "../../components";
import { secure } from "../../assets";
import { useStateContext } from "../../context";

const uploadmedia = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { address, setFiles, setActivePage, uploadFile } = useStateContext();
  const [form, setForm] = useState({
    filename: "",
    description: "",
    file: "",
    type: "",
    size: "",
    hash: "",
  });
  const { mutateAsync: upload } = useStorageUpload();

  const onFileChange = (files) => {
    console.log(files);
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm((state) => ({ ...state, [fieldName]: e.target.value }));
  };

  const captureFile = (e) => {
    console.log(e)
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
    const uploadUrl = await upload({
      data: [form.file],
      options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
    });
    return uploadUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.file) {
      setIsLoading(true);
      const hashUrl = await uploadToIpfs();
      await uploadFile({ ...form }, hashUrl[0].slice(7));
      setIsLoading(false);
      setForm({ ...form, hash: hashUrl[0].slice(7) });
      setFiles((files) => [...files, hashUrl[0].slice(7)]);
      // console.table(form)
      setActivePage("dashboard");
      router.push("/dashboard");
    } else {
      alert("Provide valid image");
      setForm({ ...form, image: "" });
    }
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      {address ? (
        <div>
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
              Upload your media
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
          >
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Media Name *"
                placeholder="Camera101.jpg"
                inputType="text"
                value={form.filename}
                required
                handleChange={(e) => handleFormFieldChange("filename", e)}
              />
              <FormField
                labelName="Description"
                placeholder="Write a title"
                inputType="text"
                value={form.title}
                handleChange={(e) => handleFormFieldChange("description", e)}
              />
            </div>

            <FormField
              labelName="File *"
              placeholder=""
              inputType="file"
              isFile
              handleChange={(e) => captureFile(e)}
            />

            <div className="w-full flex justify-start items-center p-4 bg-purple-600 h-[120px] rounded-[10px]">
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
                title="Upload 🚀"
                styles="bg-[#1dc071]"
              />
            </div>
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
