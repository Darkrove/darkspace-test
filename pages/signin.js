import React, { useEffect } from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"

export const Button = ({ img, title, handle }) => {
    return (
        <button onClick={handle} className="group relative flex h-11 items-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-white dark:before:bg-gray-600 dark:before:border-gray-600 before:border before:border-gray-200 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 disabled:before:bg-gray-300 disabled:before:scale-100">
            <span className="w-full relative flex justify-center items-center gap-3 text-base font-medium text-gray-600 dark:text-gray-100">
                <Image className="w-5 h-5" src={`/assets/${img}.svg`} width={5} height={5} />
                <span className="lg:text-base text-xs font-medium">{title}</span>
            </span>
        </button>
    )
}

const login = () => {
    const { data: session } = useSession();
    async function signInWithGithub() {
        signIn("github", { callbackUrl: "https://darkspace-test.vercel.app/dashboard" });
    }
    async function signInWithGoogle() {
        signIn("google", { callbackUrl: "https://darkspace-test.vercel.app/dashboard" });
    }
    return (
        <div className='dark:bg-[#13131a] min-h-screen grid content-center m-auto'>
            <div className="relative py-16">
                <div className="container relative m-auto px-6 text-gray-500 md:px-12 xl:px-40">
                    <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                        <div className="rounded-3xl border border-gray-100 dark:border-[#1c1c24] bg-white dark:bg-[#1c1c24] shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="p-8 py-12 sm:p-16">
                                <div className="space-y-4">
                                    <Image src="/assets/logo.svg" loading="lazy" className="w-10" width={10} height={10} alt="tailus logo" />
                                    <h2 className="mb-8 lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold text-gray-800 dark:text-white">
                                        Sign in to <br />
                                        Dark<span className="text-violet-500">Space</span>
                                    </h2>
                                    <p className="lg:text-2xl md:text-1xl text-xl font-semibold">Login or register to start accessing storage.</p>
                                </div>
                                <div className="mt-20 grid space-y-4">
                                    <Button img="google" title="Signin with Google" handle={signInWithGoogle}/>
                                    <Button img="github" title="Signin with Github" handle={signInWithGithub}/>
                                    <Button img="apple" title="Signin with Apple" />
                                </div>
                                <div className="mt-20 space-y-4 text-center text-gray-600 dark:text-gray-400 sm:-mb-8">
                                    <p className='text-xs'>
                                        By continuing, you agree to DarkSpace <br/><a href="#" className="underline">Terms of Service</a>, <a href="#" className="underline">Privacy Policy</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login