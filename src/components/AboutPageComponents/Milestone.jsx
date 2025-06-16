import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Bar } from "../Shared/Bar";
import { useState, useEffect } from "react";

export const Milestone = () => {
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

  const milestones = [
    {
      title: "Projects",
      value: 69,
      prefix: "+",
      description: "Number of Projects Completed",
    },
    {
      title: "Customer",
      value: 25,
      prefix: "+",
      description: "Happy Customer",
    },
    {
      title: "Satisfaction",
      value: 97,
      prefix: "+",
      suffix: "%",
      description: "Increased Customer satisfaction",
    },
    {
      title: "Report",
      value: 3,
      prefix: "+",
      description: "Year of Experiences",
    },
  ];

  return (
    <div
      ref={ref}
      className="md:py-16 px-4 md:px-20 bg-white text-gray-800 mt-8 md:mt-0 max-w-7xl mx-auto"
    >
      <div className="flex items-start justify-start">
        <Bar />
      </div>

      <div className="mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Milestones</h1>
        <p className="text-gray-600 text-sm max-w-2xl">
          Explore Everything journey, defined by transformative milestones,
          showcasing our unwavering commitment to excellence and innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="text-center group hover:transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {milestone.title}
            </h3>

            <div className="text-5xl font-bold font-doto text-gray-900 mb-4">
              {hasViewed ? (
                <CountUp
                  end={milestone.value}
                  prefix={milestone.prefix}
                  suffix={milestone.suffix}
                  duration={2.5 + index * 0.2}
                />
              ) : (
                // Placeholder before view
                `${milestone.prefix ?? ""}0${milestone.suffix ?? ""}`
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {milestone.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
