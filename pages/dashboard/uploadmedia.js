import React, { useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useStorageUpload } from "@thirdweb-dev/react";

import { CustomButton, FormField, Loader } from "../../components"
import { secure } from "../../assets";
import { useStateContext } from "../../context";

const uploadmedia = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setFiles, setActivePage } = useStateContext();
  const [form, setForm] = useState({
    filename: "",
    description: "",
    file: "",
    type: "",
    size: "",
  });
  const { mutateAsync: upload } = useStorageUpload();

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const captureFile = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      file: file,
      type: file.type,
      filename: file.name,
      size: file.size,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // checkIfImage(file, async (exists) => {
    if (form.file) {
      setIsLoading(true);
      const uploadUrl = await upload({
        data: [form.file],
        options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
      });
      // await createCampaign({
      //   ...form,
      //   target: ethers.utils.parseUnits(form.target, 18),
      // });
      setIsLoading(false);
      console.log(uploadUrl);
      setFiles(files => [...files, uploadUrl[0]])
      setActivePage("dashboard")
      router.push("/dashboard");
    } else {
      alert("Provide valid image");
      setForm({ ...form, image: "" });
    }
    // });

    console.log(form);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
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
            disabled
            value={form.filename}
            handleChange={(e) => handleFormFieldChange("filename", e)}
          />
          <FormField
            labelName="Description *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("description", e)}
          />
        </div>

        {/* <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        /> */}

        <FormField
          labelName="Description *"
          placeholder="Write a title"
          inputType="file"
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
  );
};

export default uploadmedia;
