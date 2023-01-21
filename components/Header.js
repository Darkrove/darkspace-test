import CustomButton from "./CustomButton";
import { heroLogo } from "../assets";

const Header = () => {
  return (
    <section class="text-gray-400 bg-zinc-900 body-font">
      <div class="container mx-auto flex px-10 lg:px-32 pt-32 pb-12 md:flex-row flex-col items-center">
        <div class="lg:flex-grow md:w-1/2 lg:pr-40 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 class="title-font sm:text-4xl lg:text-5xl text-[2.5rem] mb-4 text-zinc-200 font-extrabold">
            The Gateway to Decentralization
            <br class="hidden lg:inline-block text-zinc-400 m-0 leading-tight" />
          </h1>
          <p class="mb-8 text-xl text-zinc-400 leading-relaxed">
            Experience the power of decentralization and never worry about your
            stuff being lost or snooped.
          </p>
          <div class="flex flex-col justify-center md:flex-col lg:flex-row">
            {/* <button class="w-full inline-flex justify-center items-center text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
              Get Started
            </button>
            <button class="w-full ml-4 inline-flex justify-center items-center text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
              How it works
            </button> */}
            <CustomButton
              title={"Get Started"}
              btnType="submit"
              styles="bg-violet-500 w-64"
            />
            <CustomButton
              title={"How it works"}
              btnType="submit"
              styles="lg:ml-3 lg:mt-0 mt-3 border border-zinc-500 w-64"
            />
          </div>
          <p className="mt-2 italic font-bold text-[13px] text-zinc-500">Completely free to use. No hidden fees.</p>
        </div>
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            class="object-cover object-center rounded"
            alt="hero"
            src={heroLogo}
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
