import CountUp from "react-countup";
import { Bar } from "../Shared/Bar";

export const Milestone = () => {
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
    <div>
      <div className="flex items-start justify-start">
        <Bar />
      </div>

      {/* Header Section */}
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Milestones</h1>
        <p className="text-gray-600 text-sm max-w-2xl">
          Explore Everything journey, defined by transformative milestones,
          showcasing our unwavering commitment to excellence and innovation.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="text-center group hover:transform hover:scale-105 transition-all duration-300"
          >
            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {milestone.title}
            </h3>
            {/* Large Number */}
            <div className="text-5xl font-bold font-doto text-gray-900 mb-4">
              <CountUp
                end={milestone.value}
                prefix={milestone.prefix}
                suffix={milestone.suffix}
                duration={2.5 + index * 0.2}
              />
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {milestone.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
