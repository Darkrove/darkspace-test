import React, { useEffect } from "react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react"

import "../styles/globals.css";
import { Sidebar, Navbar, HomeNavbar } from "../components";
import { StateContextProvider } from "../context";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    import('preline')
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  const router = useRouter();

  const map = () => {
    if (router.pathname === "/" ||
      router.pathname === "/about" ||
      router.pathname === "/docs") {
      return (
        <>
          <HomeNavbar />
          <Component {...pageProps} />
        </>
      )
    } else if (router.pathname === "/signin" ||
      router.pathname === "/signup") {
      return (
        <>
          <Component {...pageProps} />
        </>
      )
    }
    else {
      return (
        <div className="relative sm:-8 p-4 bg-zinc-900 min-h-screen flex flex-row">
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>
          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            <Navbar />
            <Component {...pageProps} />
          </div>
        </div>
      )
    }
  }

  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <StateContextProvider>
        <SessionProvider session={session}>
          {map()}
        </SessionProvider>
      </StateContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
