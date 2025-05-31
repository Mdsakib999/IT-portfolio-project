import Marquee from "react-fast-marquee";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Bar = () => (
  <div className="w-16 h-1 bg-purple-600 rounded-full mb-6"></div>
);

export const Companies = () => {
  const companies = [
    {
      name: "Horse Deals",
      logo: "https://via.placeholder.com/120x60/FF6B35/FFFFFF?text=Horse+Deals",
    },
    {
      name: "Sampath Dream House",
      logo: "https://via.placeholder.com/120x60/E74C3C/FFFFFF?text=Sampath",
    },
    {
      name: "AdClipse",
      logo: "https://via.placeholder.com/120x60/3498DB/FFFFFF?text=AdClipse",
    },
    {
      name: "PJO Bridge",
      logo: "https://via.placeholder.com/120x60/2C3E50/FFFFFF?text=PJO+Bridge",
    },
    {
      name: "ClickOrder",
      logo: "https://via.placeholder.com/120x60/1ABC9C/FFFFFF?text=ClickOrder",
    },
    {
      name: "TechMate",
      logo: "https://via.placeholder.com/120x60/F39C12/FFFFFF?text=TechMate",
    },
    {
      name: "Breakthrough",
      logo: "https://via.placeholder.com/120x60/E67E22/FFFFFF?text=Breakthrough",
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col items-start">
        <Bar />
        <h3 className="text-4xl font-bold text-gray-900 mb-2">
          Meet the People
        </h3>
        <h4 className="text-4xl font-bold text-gray-900">
          We are Working With
        </h4>
      </div>

      {/* Companies Marquee */}
      <div className="relative overflow-hidden bg-gray-50 rounded-2xl py-8">
        <Marquee pauseOnHover speed={50} gradient={false}>
          {companies.map((company, index) => (
            <div
              key={index}
              className="mx-8 flex items-center justify-center cursor-pointer"
            >
              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-32 h-16 object-contain"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};
