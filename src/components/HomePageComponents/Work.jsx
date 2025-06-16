import { GiArchiveResearch } from "react-icons/gi";
import { FaBrain } from "react-icons/fa6";
import { FaConnectdevelop } from "react-icons/fa";
import { LuTestTubeDiagonal } from "react-icons/lu";
import { HiRocketLaunch } from "react-icons/hi2";
import { Zoom } from "react-awesome-reveal";

const Work = () => {
  return (
    <div className="relative py-10 px-4 my-10 overflow-hidden mt-20 flex flex-col items-center max-w-7xl mx-auto">
      {/* Blobs */}
      <div className="absolute animate-pulse -top-10 right-[20%] w-20 h-20 bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] rounded-full z-10" />
      <div className="absolute animate-pulse -bottom-10 left-10 w-20 h-20 bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] rounded-full z-10" />

      {/* Heading */}
      <h1 className="text-2xl md:text-4xl flex flex-wrap items-center gap-1 font-bold space-x-1">
        <span>How</span>
        <span className="inline-flex flex-col items-center">
          <span className="w-full h-[2px] bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] mb-1" />
          <span className="bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
            We
          </span>
        </span>
        <span className="bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
          Work?
        </span>
      </h1>

      {/* Paragraph */}
      <p className="text-base my-8 md:max-w-[80%] text-center">
        No matter the project's complexity, we apply a pragmatic approach to
        deliver projects through agile-driven stages. There are different ways
        to collaborate with us, but this is our path to bring you success for
        your software project:
      </p>

      {/* Process Tags */}
      <Zoom>
        <ul className="mt-10 w-full max-w-[90%] md:max-w-[80%] mx-auto border rounded-full flex flex-wrap items-center justify-between gap-4 px-8 py-3 bg-primary text-white hover:bg-purple-700 duration-300 text-base">
          <li className="text-sm md:text-base">Imagine</li>
          <li className="text-sm md:text-base">Build</li>
          <li className="text-sm md:text-base">Succeed</li>
        </ul>
      </Zoom>

      {/* Icons */}
      <div className="flex flex-wrap items-center justify-center gap-8 w-full max-w-[90%] md:max-w-[80%] mx-auto px-2 text-center mt-8 md:mt-12">
        <div className="flex flex-col items-center gap-y-2 w-[90px]">
          <Zoom>
            <GiArchiveResearch size={30} className="text-purple" />
          </Zoom>
          <h3 className="text-base font-semibold font-serif">Research</h3>
        </div>
        <div className="flex flex-col items-center gap-y-2 w-[90px]">
          <Zoom>
            <FaBrain size={30} className="text-[#43A047]" />
          </Zoom>
          <h3 className="text-base font-semibold font-serif">Plan</h3>
        </div>
        <div className="flex flex-col items-center gap-y-2 w-[90px]">
          <Zoom>
            <FaConnectdevelop size={30} className="text-[#039BE5]" />
          </Zoom>
          <h3 className="text-base font-semibold font-serif">Develop</h3>
        </div>
        <div className="flex flex-col items-center gap-y-2 w-[90px]">
          <Zoom>
            <LuTestTubeDiagonal size={30} className="text-[#FBC02D]" />
          </Zoom>
          <h3 className="text-base font-semibold font-serif">Test</h3>
        </div>
        <div className="flex flex-col items-center gap-y-2 w-[90px]">
          <Zoom>
            <HiRocketLaunch size={30} className="text-[#E53935]" />
          </Zoom>
          <h3 className="text-base font-semibold font-serif">Launch</h3>
        </div>
      </div>
    </div>
  );
};

export default Work;
