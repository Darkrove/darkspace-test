import React, { useState, useEffect } from 'react'
import { getSession } from "next-auth/react";

import { useStateContext } from "../../context";
import { shortenAddress } from "../../utils";
import { DisplayFiles } from "../../components";

const files = () => {
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
            <div className="mb-4 bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
                <p className="text-white text-center text-3xl font-bold sm:text-4xl md:text-5xl">
                    files 🖼️
                </p>
            </div>
            <DisplayFiles
                title="Files"
                isLoading={isLoading}
                files={files.filter(file => file.type !== "directory")}
                address={address}
                user={true}
            />
        </div>
    )
}

export default files

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