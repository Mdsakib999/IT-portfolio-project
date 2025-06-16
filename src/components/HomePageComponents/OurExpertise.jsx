import { SiWebpack } from "react-icons/si";
import { FaMobileScreenButton } from "react-icons/fa6";
import { SiDigitalocean } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { SiAntdesign } from "react-icons/si";
import { SiJirasoftware } from "react-icons/si";
import { Zoom } from "react-awesome-reveal";

const services = [
  {
    icon: <SiWebpack color="purple" size={80} />,
    text: "Web-App Development",
  },
  {
    icon: <FaMobileScreenButton color="green" size={80} />,
    text: "Mobile Development",
  },
  {
    icon: <SiDigitalocean color="blue" size={80} />,
    text: "Digital Marketing",
  },
  {
    icon: <FaShoppingCart color="black" size={80} />,
    text: "E-commerce Solution",
  },
  {
    icon: <SiAntdesign color="red" size={80} />,
    text: "UI/UX Design",
  },
  {
    icon: <SiJirasoftware color="orange" size={80} />,
    text: "Software Development",
  },
];

const OurExpertise = () => {
  return (
    <div className="py-10 mt-10 bg-[#FFFEFE] ">
      <div className="space-y-3 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center">
          Our{" "}
          <span className="bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
            Expertise
          </span>
        </h1>
        <p className="text-center">
          Make a massive difference to your bottom-line development  cycle with
          our performance-driven solutions!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <Zoom key={index}>
            <div className="bg-[#F2F0F3] flex flex-col items-center rounded-xl p-10 shadow shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 duration-300">
              <p>{service.icon}</p>
              <p className="font-serif mt-3 text-lg">{service.text}</p>
            </div>
          </Zoom>
        ))}
      </div>
    </div>
  );
};

export default OurExpertise;
