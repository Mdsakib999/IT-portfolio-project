import { Slide } from "react-awesome-reveal";
import homeBanner from "../../assets/HomeBanner.png";
import { PrimaryButton } from "../Shared/PrimaryButton";

const HomeBanner = () => {
  return (
    <div className="scrollbar-hide overflow-x-scroll flex flex-col md:flex-row items-center justify-center md:justify-between py-10 bg-[#ffffff] text-center md:text-start pt-28 max-w-7xl mx-auto ">
      <Slide className="w-full" direction="left">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
              Achieve your development goals
            </h1>
            <h2 className="text-xl md:text-2xl bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
              with top-tier, reliable talent!
            </h2>
          </div>
          <p className="text-sm w-full md:w-[75%] lg:w-[65%]">
            Exabyting brings impact-oriented IT professionals to help you boost
            business flexibility and facilitate your business growth like never
            before.
          </p>
          <button className="cursor-pointer border rounded-full px-8 py-2.5 bg-[#5E35B1] hover:bg-purple-900 duration-300 text-white tracking-widest">
            Learn More
          </button>
        </div>
      </Slide>
      <Slide className="w-full" direction="right">
        <div className="mt-10 md:mt-0">
          <img src={homeBanner} alt="" />
        </div>
      </Slide>
    </div>
  );
};

export default HomeBanner;
