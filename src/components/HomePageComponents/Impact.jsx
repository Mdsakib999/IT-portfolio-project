import { IoIosPeople } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { FaLaptopCode } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import CountUp from "react-countup";

const Impact = () => {
	return (
		<div className="py-10 mt-10 px-4">
			<div className="space-y-3 text-center">
				<h1 className="text-2xl md:text-3xl font-bold">
					Turning Ideas Into{" "}
					<span className="bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
						Impact
					</span>
				</h1>
				<p className="text-sm md:text-base max-w-lg mx-auto mt-6">
					Together, we combine expertise and passion to create cutting-edge
					solutions that inspire growth and lead to lasting success.
				</p>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-12 lg:px-16">
				<div className="flex flex-col items-center min-w-[120px]">
					<IoIosPeople size={40} className="text-[#5E35B1]" />
					<div className="text-center mt-5">
						<CountUp start={0} end={1000} delay={0}>
							{({ countUpRef }) => (
								<div>
									<span
										className="font-bold text-lg font-sans mb-2"
										ref={countUpRef}
									/>
									+
								</div>
							)}
						</CountUp>
						<p className="text-sm">Happy Clients</p>
					</div>
				</div>

				<div className="flex flex-col items-center min-w-[120px]">
					<FaLaptopCode size={40} className="text-[#5E35B1]" />
					<div className="text-center mt-5">
						<CountUp start={0} end={100} delay={0}>
							{({ countUpRef }) => (
								<div>
									<span
										className="font-bold text-lg font-sans mb-2"
										ref={countUpRef}
									/>
									+
								</div>
							)}
						</CountUp>
						<p className="text-sm">Finished Projects</p>
					</div>
				</div>

				<div className="flex flex-col items-center min-w-[120px]">
					<TiTick size={40} className="text-[#5E35B1]" />
					<div className="text-center mt-5">
						<CountUp start={0} end={99} delay={0}>
							{({ countUpRef }) => (
								<div>
									<span
										className="font-bold text-lg font-sans mb-2"
										ref={countUpRef}
									/>
									%
								</div>
							)}
						</CountUp>
						<p className="text-sm">Satisfaction Rate</p>
					</div>
				</div>

				<div className="flex flex-col items-center min-w-[120px]">
					<FaClock size={35} className="text-[#5E35B1]" />
					<div className="text-center mt-5">
						<CountUp start={0} end={10} delay={0}>
							{({ countUpRef }) => (
								<div>
									<span
										className="font-bold text-lg font-sans mb-2"
										ref={countUpRef}
									/>
									+
								</div>
							)}
						</CountUp>
						<p className="text-sm">Years of Experience</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Impact;
