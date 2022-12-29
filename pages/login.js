import React, { useEffect } from 'react'
import Image from 'next/image'

export const Button = ({ img, title }) => {
    return (
        <button class="group relative flex h-11 items-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-white dark:before:bg-gray-600 dark:before:border-gray-600 before:border before:border-gray-200 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 disabled:before:bg-gray-300 disabled:before:scale-100">
            <span class="w-full relative flex justify-center items-center gap-3 text-base font-medium text-gray-600 dark:text-gray-100">
                <Image class="w-5 h-5 absolute left-0" src={`/assets/${img}.svg`} width={5} height={5} />
                <span>{title}</span>
            </span>
        </button>
    )
}

const login = () => {
    return (
        <div className='dark:bg-[#13131a] min-h-screen grid content-center m-auto'>
            <div class="relative py-16">
                <div class="container relative m-auto px-6 text-gray-500 md:px-12 xl:px-40">
                    <div class="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                        <div class="rounded-3xl border border-gray-100 dark:border-[#1c1c24] bg-white dark:bg-[#1c1c24] shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div class="p-8 py-12 sm:p-16">
                                <div class="space-y-4">
                                    <Image src="/assets/logo.svg" loading="lazy" class="w-10" width={10} height={10} alt="tailus logo" />
                                    <h2 class="mb-8 text-2xl font-bold text-gray-800 dark:text-white">
                                        Log in to unlock the <br />
                                        best of DarkSpace.
                                    </h2>
                                </div>
                                <div class="mt-20 grid space-y-4">
                                    <Button img="google" title="Continue with Google" />
                                    <Button img="github" title="Continue with Github" />
                                    <Button img="apple" title="Continue with Apple" />
                                </div>
                                <div class="mt-20 space-y-4 text-center text-gray-600 dark:text-gray-400 sm:-mb-8">
                                    <p class="text-xs">
                                        By proceeding, you agree to our <a href="#" class="underline">Terms of Use</a> and
                                        confirm you have read our <a href="#" class="underline"> Privacy and Cookie Statement</a>.
                                    </p>
                                    <p class="text-xs">
                                        This site is protected by reCAPTCHA and the <a href="#" class="underline">Google Privacy Policy</a> and <a href="#" class="underline">Terms of Service</a> apply.
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