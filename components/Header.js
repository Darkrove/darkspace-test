import Balancer from "react-wrap-balancer";
import CustomButton from "./CustomButton";
import { heroLogo, MacBook, SafariMockup } from "../assets/Icons";

const Header = () => {
  return (
    <section className="text-gray-400 bg-zinc-900 body-font overflow-hidden">
      <div className="container mx-auto flex px-10 lg:px-32 pt-32 pb-12 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-32 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-3xl lg:text-3xl xl:text-5xl text-[1.9rem] mb-4 text-zinc-200 font-extrabold">
            <Balancer>Securely Store and Share Your Videos and Images on the Blockchain with DarkSpace</Balancer>
            <br className="hidden lg:inline-block text-zinc-400 m-0 leading-tight" />
          </h1>
          <h1 className="mb-8 text-lg lg:text-xl text-zinc-400 leading-relaxed">
            <Balancer>Experience the power of decentralization and never worry about your stuff being lost or snooped.</Balancer>
          </h1>
          <div className="flex flex-col justify-center md:flex-col lg:flex-col xl:flex-row">
            {/* <button className="w-full inline-flex justify-center items-center text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
              Get Started
            </button>
            <button className="w-full ml-4 inline-flex justify-center items-center text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
              How it works
            </button> */}
            <CustomButton
              title={"Join Now"}
              btnType="submit"
              styles="bg-violet-500 w-64"
            />
            <CustomButton
              title={"Read the Docs"}
              btnType="submit"
              styles="xl:ml-3 xl:mt-0 mt-3 border border-zinc-500 w-64"
            />
          </div>
          <p className="mt-2 italic font-bold text-[13px] text-zinc-500">Completely free to use. No hidden fees.</p>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          {/* <img
            className="object-cover object-center rounded"
            alt="hero"
            src={heroLogo}
          /> */}
          <SafariMockup className="xl:w-[870px] lg:w-[670px]"/>
        </div>
      </div>
    </section>
  );
};

export default Header;
