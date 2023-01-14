import React from 'react'
import Image from "next/image"
import Router from 'next/router'

const HomeNavbar = () => {
    return (
        <nav className="fixed z-10 w-full bg-white dark:bg-transparent md:absolute md:bg-transparent">
            <div className="container m-auto px-2 md:px-12 lg:px-7">
                <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
                    <input type="checkbox" name="toggle_nav" id="toggle_nav" className="peer hidden" />
                    <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30 mb-4">
                        <a href="#" aria-label="logo" className="flex space-x-2 items-center">
                            <Image src="/assets/logo.svg" className="w-12" alt="logo" width="144" height="133" />
                            <span className="text-2xl font-bold text-black dark:text-white">Dark<span className="text-violet-500">Space</span></span>
                        </a>

                        <div className="flex items-center lg:hidden max-h-10">
                            <label role="button" htmlFor="toggle_nav" aria-label="humburger" id="hamburger" className="relative w-10 h-auto p-2">
                                <div id="line"
                                    className="m-auto h-0.5 w-6 rounded bg-yellow-900 dark:bg-white transition duration-300"></div>
                                <div id="line2"
                                    className="m-auto mt-2 h-0.5 w-6 rounded bg-yellow-900 dark:bg-white transition duration-300">
                                </div>
                            </label>
                        </div>
                    </div>

                    <label role="button" htmlFor="toggle_nav" className="hidden peer-checked:block fixed w-full h-full left-0 top-0 z-10 bg-gray-700 dark:bg-opacity-30 bg-opacity-30 backdrop-blur backdrop-filter"></label>
                    <div className="hidden peer-checked:flex w-full flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-gray-200 dark:bg-[#13131a] lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12">
                        <div className="text-gray-600 lg:pr-4 w-full">
                            <ul className="tracking-wide font-medium  text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                                <li>
                                    <a href="#" className="block md:px-4 transition dark:text-gray-300 dark:hover:text-violet-500 text-gray-800">
                                        <span>Home</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block md:px-4 transition dark:text-gray-300 dark:hover:text-violet-500 text-gray-800">
                                        <span>Documentation</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block md:px-4 transition dark:text-gray-300 dark:hover:text-violet-500 text-gray-800">
                                        <span>About</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="w-full min-w-max space-y-2 border-violet-500 lg:space-y-0 sm:w-max lg:border-l dark:lg:border-violet-500">
                            {/* <button type="button" className="w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200 dark:active:bg-gray-700 dark:focus:bg-gray-800 focus:bg-yellow-100 sm:w-max">
                                <span className="block text-yellow-800 dark:text-white font-semibold text-sm">
                                    Sign up
                                </span>
                            </button> */}
                            <button onClick={() => Router.push("/signin")} type="button" className="ml-3 w-full py-3 px-6 text-center rounded-full transition bg-violet-500 hover:bg-violet-600 active:opacity-80 focus:opacity-80 sm:w-max">
                                <span className="block text-white font-semibold text-sm">
                                    Signin
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default HomeNavbar