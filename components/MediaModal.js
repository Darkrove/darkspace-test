import React, { useState } from "react";
import Image from "next/image";

export default function MediaModal({ id, setOpenModal, src, name, username }) {
  const [isLoading, setLoading] = useState(true);
  const download = async(href) => {
    // console.log(href);
    await fetch(href, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", name); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="fixed inset-0 z-30 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-90"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8" id={id}>
          <div className="relative w-full max-w-lg p-4 mx-auto dark:bg-gray-900 bg-white rounded-lg shadow-lg">
            <div className="sm:flex">
              <div className="text-center">
                <h4 className="text-sm text-left xl:text-lg font-medium dark:text-white text-gray-800">
                  @{username}
                </h4>
                <div className="mt-2 text-center space-y-6 text-[15px] leading-relaxed text-gray-500">
                  <Image
                    src={src}
                    alt="illustration"
                    loading="lazy"
                    width={600}
                    height={500}
                    className="mx-auto w-50 rounded-lg"
                  />
                </div>
                <div className="items-center gap-2 mt-3 sm:flex">
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-cyan-600 rounded-md outline-none ring-offset-2 ring-white-600 focus:ring-2"
                    download
                    onClick={() => download(src)}
                  >
                    Download
                  </button>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 dark:text-white text-gray-800 rounded-md outline-none border ring-offset-2 ring-cyan-600 focus:ring-2"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
