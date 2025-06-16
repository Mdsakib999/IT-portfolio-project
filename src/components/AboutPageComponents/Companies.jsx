import Marquee from "react-fast-marquee";

const Bar = () => (
  <div className="w-16 h-1 bg-purple-600 rounded-full mb-6"></div>
);

export const Companies = () => {
  const companies = [
    {
      name: "Horse Deals",
      logo: "https://logopond.com/logos/de1a291bb27d482c6c67027af23cb70f.png",
    },
    {
      name: "Sampath Dream House",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmAjdGN7mf96S8TXSunG7AX0gTHNePQqvH4g&s",
    },
    {
      name: "AdClipse",
      logo: "https://static.wixstatic.com/media/263594_8ec72c7553a749ecb6d4f2c392b25589~mv2.jpg/v1/fit/w_2500,h_1330,al_c/263594_8ec72c7553a749ecb6d4f2c392b25589~mv2.jpg",
    },
    {
      name: "PJO Bridge",
      logo: "https://www.shutterstock.com/shutterstock/photos/2226094483/display_1500/stock-vector-p-bridge-letter-logo-template-for-your-branding-2226094483.jpg",
    },
    {
      name: "ClickOrder",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhFdOS_gZ_KIWELAyEr0wq5vc2Fwb9gfRf3A&s",
    },
    {
      name: "TechMate",
      logo: "https://images.squarespace-cdn.com/content/v1/60ff5477319c211f27b0cd78/727ab04b-799b-4ebf-898c-67b42a65136f/Desktop+Logo+1600x644.png",
    },
    {
      name: "Breakthrough",
      logo: "https://static.brandfinance.com/wp-content/uploads/2020/09/breakthrough_logo.png",
    },
  ];

  return (
    <div className="my-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col items-start p-5">
        <Bar />
        <h3 className="text-4xl font-bold text-gray-900 mb-2">
          Meet the People
        </h3>
        <h4 className="text-4xl font-bold text-gray-900">
          We are Working With
        </h4>
      </div>

      {/* Companies Marquee */}
      <div className="relative overflow-hidden py-8">
        <Marquee pauseOnHover speed={200} gradient={false}>
          {companies.map((company, index) => (
            <div
              key={index}
              className="mx-8 flex items-center justify-center cursor-pointer"
            >
              <div className="p-4 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-32 h-16 object-contain"
                />
                <p className="text-gray-800 text-lg font-semibold mt-2">
                  {company.name}
                </p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};
