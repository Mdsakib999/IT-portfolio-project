import { GiArchiveResearch } from "react-icons/gi";
import { FaBrain } from "react-icons/fa6";
import { FaConnectdevelop } from "react-icons/fa";
import { LuTestTubeDiagonal } from "react-icons/lu";
import { HiRocketLaunch } from "react-icons/hi2";

const Work = () => {
	return (
		<div className="relative bg-[#F9F9F9] py-10 px-4 my-10 overflow-hidden">
			{/* Blobs */}
			<div className="absolute -top-10 right-[20%] w-20 h-20 bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] rounded-full z-10" />
			<div className="absolute -bottom-10 left-10 w-20 h-20 bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] rounded-full z-10" />

			{/* Heading */}
			<h1 className="text-3xl md:text-4xl flex flex-wrap items-center gap-1 text-start font-bold space-x-1">
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
			<p className="text-base text-start mt-4 md:max-w-[80%]">
				No matter the project's complexity, we apply a pragmatic approach to
				deliver projects through agile-driven stages. There are different ways
				to collaborate with us, but this is our path to bring you success for
				your software project:
			</p>

			{/* Process Tags */}
			<ul className="w-full max-w-[90%] md:max-w-[80%] mx-auto mt-8 border rounded-full flex flex-wrap items-center justify-between gap-4 px-8 py-3 bg-[#5E35B1] text-white hover:bg-purple-700 duration-300 text-base">
				<li className="text-sm md:text-base">Imagine</li>
				<li className="text-sm md:text-base">Build</li>
				<li className="text-sm md:text-base">Succeed</li>
			</ul>

			{/* Icons */}
			<div className="flex flex-wrap items-center justify-center gap-8 w-full max-w-[90%] md:max-w-[80%] mx-auto mt-10 px-2 text-center">
				<div className="flex flex-col items-center gap-y-2 w-[90px]">
					<GiArchiveResearch size={30} className="text-[#5E35B1]" />
					<h3 className="text-base font-semibold">Research</h3>
				</div>
				<div className="flex flex-col items-center gap-y-2 w-[90px]">
					<FaBrain size={30} className="text-[#43A047]" />
					<h3 className="text-base font-semibold">Plan</h3>
				</div>
				<div className="flex flex-col items-center gap-y-2 w-[90px]">
					<FaConnectdevelop size={30} className="text-[#039BE5]" />
					<h3 className="text-base font-semibold">Develop</h3>
				</div>
				<div className="flex flex-col items-center gap-y-2 w-[90px]">
					<LuTestTubeDiagonal size={30} className="text-[#FBC02D]" />
					<h3 className="text-base font-semibold">Test</h3>
				</div>
				<div className="flex flex-col items-center gap-y-2 w-[90px]">
					<HiRocketLaunch size={30} className="text-[#E53935]" />
					<h3 className="text-base font-semibold">Launch</h3>
				</div>
			</div>
		</div>
	);
};

export default Work;
