import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";

import { useStateContext } from "../../context";
import { shortenAddress } from "../../utils";
import { DisplayFiles } from "../../components";

const recent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const { address, contract, getUserFiles } = useStateContext();

  const fetchFiles = async () => {
    setIsLoading(true);
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
        title="Recent uploads"
        isLoading={isLoading}
        files={files}
        address={address}
        user={true}
      />
    </div>
  );
};

export default recent;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}