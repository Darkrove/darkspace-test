import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

import "../styles/globals.css";
import { Sidebar, Navbar } from "../components";
import { StateContextProvider } from "../context";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      {router.pathname === "/" ||
      router.pathname === "/signin" ||
      router.pathname === "/signup" ? (
        <>
          <Component {...pageProps} />
        </>
      ) : (
        <>
          <StateContextProvider>
            <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
              <div className="sm:flex hidden mr-10 relative">
                <Sidebar />
              </div>
              <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                <Navbar />
                <Component {...pageProps} />
              </div>
            </div>
          </StateContextProvider>
        </>
      )}
    </ThirdwebProvider>
  );
}

export default MyApp;
