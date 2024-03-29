import { SafariMockup } from "../assets/Icons";
import Balancer from "react-wrap-balancer";
import Router from "next/router";

import styles from "../styles/Button.module.css"

export default function CtaSection() {
  return (
    <div className="bg-zinc-900 relative overflow-hidden isolate">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        className="absolute top-1/3 left-1/2 -z-10 h-[74rem] w-[74rem] -translate-y-1/2 sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:translate-y-0 lg:-translate-x-1/2"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient
            id="759c1415-0410-454c-8f7c-9a820de03641"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(512 512) rotate(90) scale(512)"
          >
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
          </radialGradient>
        </defs>
      </svg>
      <div className="mx-auto max-w-[100rem] py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-transparent px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-32 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <Balancer>
                Securely Store and Share Your Videos and Images on the
                Blockchain with DarkSpace
              </Balancer>
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              <Balancer>
                Experience the power of decentralization and never worry about
                your stuff being lost or snooped.
              </Balancer>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <button
                onClick={() => Router.push("/signin")}
                className={`${styles.button} border border-violet-500 hover:border-transparent w-full duration-200 transition-all rounded-md bg-violet-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
              >
                Join Now 🚀
              </button>
              <button
                className={`${styles.button} hover:border-transparent w-full rounded-md px-3.5 py-1.5 text-base font-semibold leading-7 text-white border border-violet-500`}
              >
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className="mt-2 italic font-bold text-[13px] text-zinc-500">
              Completely free to use. No hidden fees.
            </p>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <SafariMockup
              className="absolute top-0 left-0 w-[50rem] max-w-none rounded-md"
              width={1824}
              height={540}
            />
            {/* <img
                className="absolute top-0 left-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                alt="App screenshot"
                width={1824}
                height={1080}
              /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
