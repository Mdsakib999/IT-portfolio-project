import fintech from "../../assets/fintech.png";
import edtech from "../../assets/edtech.jpg";
import healthtech from "../../assets/healthtech.jpg";
import automation from "../../assets/automation.webp";

const IndustryExpertise = () => {
	return (
		<div className="py-6 md:py-10 px-4 sm:px-6 lg:px-8">
			<div className="space-y-3 text-center">
				<h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
					Industry{" "}
					<span className="bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
						Expertise{" "}
					</span>
				</h1>
				<h2 className="text-lg sm:text-xl md:text-2xl">
					Industries where our{" "}
					<span className="bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
						software expertise{" "}
					</span>{" "}
					fueled partner{" "}
					<span className="bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
						growth.
					</span>
				</h2>
			</div>

			<div className="mt-8 md:mt-12 space-y-12 md:space-y-16">
				{/* Fintech */}
				<div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
					<div className="w-full md:w-1/2">
						<img
							className="w-full max-h-64 rounded-lg object-cover"
							src={fintech}
							alt="Fintech"
						/>
					</div>
					<div className="w-full md:w-1/2 mt-4 md:mt-0">
						<h1 className="text-lg sm:text-xl font-bold font-serif">
							<span className="font-sans">01</span> Fin
							<span className="text-[#DE4396]">Tech</span>
						</h1>
						<p className="mt-2 text-sm sm:text-base">
							Our engineers solve fintech challenges by building secure,
							scalable systems with real-time analytics, strong encryption, and
							seamless API integration to ensure fast, reliable, and compliant
							financial services.
						</p>
					</div>
				</div>

				{/* Edtech */}
				<div className="flex flex-col md:flex-row-reverse items-center justify-center gap-4 md:gap-6">
					<div className="w-full md:w-1/2">
						<img
							className="w-full max-h-64 rounded-lg object-cover"
							src={edtech}
							alt="Edtech"
						/>
					</div>
					<div className="w-full md:w-1/2 mt-4 md:mt-0">
						<h1 className="text-lg sm:text-xl font-bold font-serif">
							<span className="font-sans">02</span> Ed
							<span className="text-[#DE4396]">Tech</span>
						</h1>
						<p className="mt-2 text-sm sm:text-base">
							Our engineers tackle edtech challenges by building interactive,
							scalable learning platforms that support personalized education,
							real-time collaboration, and smooth content delivery across
							devices.
						</p>
					</div>
				</div>

				{/* Healthtech */}
				<div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
					<div className="w-full md:w-1/2">
						<img
							className="w-full max-h-64 rounded-lg object-cover"
							src={healthtech}
							alt="Healthtech"
						/>
					</div>
					<div className="w-full md:w-1/2 mt-4 md:mt-0">
						<h1 className="text-lg sm:text-xl font-bold font-serif">
							<span className="font-sans">03</span> Health
							<span className="text-[#DE4396]">Tech</span>
						</h1>
						<p className="mt-2 text-sm sm:text-base">
							Our engineers solve healthtech challenges by developing secure,
							user-centric platforms that enable real-time data access, remote
							care, and compliance with healthcare regulations like HIPAA.
						</p>
					</div>
				</div>

				{/* Process Automation */}
				<div className="flex flex-col md:flex-row-reverse items-center justify-center gap-4 md:gap-6">
					<div className="w-full md:w-1/2">
						<img
							className="w-full max-h-64 rounded-lg object-cover"
							src={automation}
							alt="Process Automation"
						/>
					</div>
					<div className="w-full md:w-1/2 mt-4 md:mt-0">
						<h1 className="text-lg sm:text-xl font-bold font-serif">
							<span className="font-sans">04</span> Process
							<span className="text-[#DE4396]"> Automation</span>
						</h1>
						<p className="mt-2 text-sm sm:text-base">
							Our engineers streamline operations by building automation systems
							that optimize workflows, integrate with existing tools, and
							leverage AI to enhance efficiency and reduce manual processes.
						</p>
					</div>
				</div>
			</div>

			{/* Additional CSS for very small screens */}
			<style jsx>{`
				@media (max-width: 320px) {
					h1 {
						font-size: 1rem;
					}
					h2 {
						font-size: 0.875rem;
					}
					p {
						font-size: 0.75rem;
					}
					.max-h-64 {
						max-height: 48px;
					}
				}
			`}</style>
		</div>
	);
};

export default IndustryExpertise;
