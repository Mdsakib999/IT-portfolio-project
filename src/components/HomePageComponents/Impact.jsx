import { IoIosPeople } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { FaLaptopCode } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const milestones = [
  {
    icon: IoIosPeople,
    value: 1000,
    suffix: "+",
    description: "Happy Clients",
  },
  {
    icon: FaLaptopCode,
    value: 100,
    suffix: "+",
    description: "Finished Projects",
  },
  {
    icon: TiTick,
    value: 99,
    suffix: "%",
    description: "Satisfaction Rate",
  },
  {
    icon: FaClock,
    value: 10,
    suffix: "+",
    description: "Years of Experience",
  },
];

const Impact = () => {
  const [hasViewed, setHasViewed] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      setHasViewed(true);
    } else {
      setHasViewed(false);
    }
  }, [inView]);

  return (
    <div className="py-10 mt-10 px-4 max-w-7xl mx-auto">
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

      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-12 lg:px-16"
      >
        {milestones.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300 text-5xl font-bold "
            >
              <Icon size={40} className="text-purple-600 mb-4 text-5xl" />
              <div className="font-doto text-gray-900 mb-2">
                {hasViewed ? (
                  <CountUp
                    end={item.value}
                    suffix={item.suffix}
                    duration={2.5 + index * 0.2}
                  />
                ) : (
                  `0${item.suffix}`
                )}
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Impact;
