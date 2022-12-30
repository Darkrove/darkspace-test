import React, { useState } from "react";
import Image from "next/image";

export default function MediaModal({ id, setOpenModal, src, name, type, username }) {
  const [isLoading, setLoading] = useState(true);
  const downloadUsingFetch = async (HREF, name) => {
    // console.log(href);
    await fetch(HREF, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", name); //or any other extension
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link)
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
          className="fixed inset-0 w-full h-full bg-black opacity-80"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8" id={id}>
          <div className="relative w-full max-w-lg p-4 mx-auto bg-[#1c1c24] rounded-xl shadow-lg">
            <div className="sm:flex">
              <div className="text-center">
                <h4 className="text-sm text-left xl:text-lg font-medium text-[#808191]">
                  By @{username}
                </h4>
                {type === "video/mp4"
                  ? (
                    <div className="mt-2 text-center space-y-6 text-[15px] leading-relaxed text-gray-500">
                      <video
                        controls
                        src={src}
                        className="mx-auto w-50 rounded-lg"
                      />
                    </div>
                  )
                  : (
                    <>
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
                          className="w-full mt-2 p-2.5 flex-1 text-black font-medium bg-[#1dc071] rounded-md outline-none ring-offset-2 ring-white-600 focus:ring-2"
                          download
                          onClick={() => downloadUsingFetch(src, name)}
                        >
                          Download
                        </button>
                        <button
                          className="w-full mt-2 p-2.5 flex-1 text-white rounded-md font-medium outline-none border ring-offset-2 ring-[#1dc071] focus:ring-2"
                          onClick={() => setOpenModal(false)}
                        >
                          Share
                        </button>
                      </div>
                    </>
                  )
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
