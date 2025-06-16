import fintech from "../../assets/fintech.png";
import edtech from "../../assets/edtech.jpg";
import healthtech from "../../assets/healthtech.jpg";
import automation from "../../assets/automation.webp";
import { Slide } from "react-awesome-reveal";

const industries = [
  {
    id: "01",
    title: "FinTech",
    prefix: "Fin",
    image: fintech,
    alt: "Fintech",
    description:
      "Our engineers solve fintech challenges by building secure, scalable systems with real-time analytics, strong encryption, and seamless API integration to ensure fast, reliable, and compliant financial services.",
    reverse: false,
    slideDirection: "left",
  },
  {
    id: "02",
    title: "EdTech",
    prefix: "Ed",
    image: edtech,
    alt: "Edtech",
    description:
      "Our engineers tackle edtech challenges by building interactive, scalable learning platforms that support personalized education, real-time collaboration, and smooth content delivery across devices.",
    reverse: true,
    slideDirection: "right",
  },
  {
    id: "03",
    title: "HealthTech",
    prefix: "Health",
    image: healthtech,
    alt: "Healthtech",
    description:
      "Our engineers solve healthtech challenges by developing secure, user-centric platforms that enable real-time data access, remote care, and compliance with healthcare regulations like HIPAA.",
    reverse: false,
    slideDirection: "left",
  },
  {
    id: "04",
    title: "Process Automation",
    prefix: "Process",
    image: automation,
    alt: "Process Automation",
    description:
      "Our engineers streamline operations by building automation systems that optimize workflows, integrate with existing tools, and leverage AI to enhance efficiency and reduce manual processes.",
    reverse: true,
    slideDirection: "right",
  },
];

const IndustryExpertise = () => {
  return (
    <div className="scrollbar-hide overflow-x-scroll py-6 md:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
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
          </span>
          fueled partner{" "}
          <span className="bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
            growth.
          </span>
        </h2>
      </div>

      <div className="mt-8 md:mt-12 space-y-12 md:space-y-16">
        {industries.map(
          ({
            id,
            title,
            prefix,
            image,
            alt,
            description,
            reverse,
            slideDirection,
          }) => (
            <div
              key={id}
              className={`flex flex-col ${
                reverse ? "md:flex-row-reverse" : "md:flex-row"
              } items-center justify-center gap-4 md:gap-6`}
            >
              <Slide className="w-full md:w-1/2" direction={slideDirection}>
                <div>
                  <img
                    className="w-full max-h-64 rounded-lg object-cover"
                    src={image}
                    alt={alt}
                  />
                </div>
              </Slide>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h1 className="text-lg sm:text-xl font-bold font-serif">
                  <span className="font-sans">{id}</span> {prefix}
                  <span className="text-[#DE4396]">
                    {title.replace(prefix, "")}
                  </span>
                </h1>
                <p className="mt-2 text-sm sm:text-base">{description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default IndustryExpertise;
