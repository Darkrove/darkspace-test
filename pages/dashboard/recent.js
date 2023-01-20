import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { useStateContext } from "../../context";
import { shortenAddress } from "../../utils";
import { LeftFaceArrow } from "../../assets/Icons";
import { DisplayFiles } from "../../components";

const recent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const { address, contract, setActivePage, getUserFiles } = useStateContext();

  const fetchFiles = async () => {
    setIsLoading(true);
    console.log()
    const data = await getUserFiles();
    setFiles(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchFiles();
  }, [address, contract]);

  return (
    <div>
      <DisplayFiles
        title="Recent Images"
        subtitle="Recent images"
        isLoading={isLoading}
        files={files.filter((file) => file.type.split("/")[0] === "image").slice(0, 3)}
        address={address}
        user={true}
      >
        {address &&
        files.filter((file) => file.type.split("/")[0] === "image").length >
          0 ? (
          <Link
            href="/dashboard/files"
            onClick={() => setActivePage("files")}
            rel="noreferrer"
            className="flex group gap-2 mt-[10px] items-center duration-200 text-zinc-500 cursor-pointer no-underline dark:hover:text-zinc-400 hover:text-zinc-700"
          >
            See Others{" "}
            <span className="group-hover:translate-x-1 duration-200">
              <LeftFaceArrow className="w-4 h-4 fill-current" />
            </span>
          </Link>
        ) : (
          null
        )}
      </DisplayFiles>
      <DisplayFiles
        title="Recent Videos"
        subtitle="Recent videos"
        isLoading={isLoading}
        files={files.filter((file) => file.type.split("/")[0] === "video").slice(0, 3)}
        address={address}
        user={true}
        style="mt-[20px]"
      >
        {address &&
        files.filter((file) => file.type.split("/")[0] === "video").length >
          0 ? (
          <Link
            href="/dashboard/files"
            onClick={() => setActivePage("files")}
            rel="noreferrer"
            className="flex group gap-2 mt-[10px] items-center duration-200 text-zinc-500 cursor-pointer no-underline dark:hover:text-zinc-400 hover:text-zinc-700"
          >
            See Others{" "}
            <span className="group-hover:translate-x-1 duration-200">
              <LeftFaceArrow className="w-4 h-4 fill-current" />
            </span>
          </Link>
        ) : (
          null
        )}
      </DisplayFiles>
    </div>
  );
};

export default recent;

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req })

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/signin',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: { session }
//   }
// }
