import { Bar } from "../Shared/Bar";
import { timelineSteps } from "../../Data/timelineData";
import { TimelineCard } from "./TimelineCard";

export const AlcalineWorks = () => {
  const topCards = timelineSteps.filter((step) => step.id % 2 !== 0);
  const bottomCards = timelineSteps.filter((step) => step.id % 2 === 0);

  return (
    <div className="my-20">
      <Bar />
      <div className="flex justify-center items-center mb-8 px-4">
        <h1 className="text-2xl md:text-3xl text-center">
          <span className="block mb-2 md:mb-4">How development</span>
          <span className="block font-bold">through Alcaline works</span>
        </h1>
      </div>

      {/* Desktop Timeline Layout */}
      <div className="hidden lg:block relative w-full py-16 px-4">
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-0 right-0 max-w-6xl mx-auto h-[2px] bg-pink-400 z-0" />

        {/* Top row (odd cards) */}
        <div className="relative z-10 grid grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {topCards.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <TimelineCard step={step} position="top" />
              <div className="w-[2px] h-6 bg-pink-400" />
            </div>
          ))}
        </div>

        {/* Bottom row (even cards) */}
        <div className="relative z-10 grid grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          {bottomCards.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className="w-[2px] h-6 bg-pink-400" />
              <TimelineCard step={step} position="bottom" />
            </div>
          ))}
        </div>

        {/* Trophy */}
        <div className="absolute right-[16%] top-1/2 -translate-y-1/2 z-10 ">
          <span className="text-4xl">🏆</span>
        </div>
      </div>

      {/* Mobile/Tablet Timeline Layout */}
      <div className="lg:hidden relative w-full py-8 px-4 bg-[#f9f9fc]">
        <div className="absolute left-2 top-10 bottom-8 w-[2px] bg-pink-400 z-0" />

        <div className="relative z-10 space-y-8 ml-2">
          {timelineSteps.map((step) => (
            <div key={step.id} className="relative flex items-start">
              {/* Circle */}
              <div className="absolute -left-[9px] top-16 w-4 h-4 mr-4 bg-pink-400 rounded-full" />
              {/* Horizontal line */}
              <div className="absolute -left-4 top-18 w-4 h-[2px] bg-pink-400" />
              <div className="flex-1 ml-2">
                <TimelineCard step={step} position="left" />
              </div>
            </div>
          ))}

          {/* Trophy */}
          <div className="flex pt-4 justify-start">
            <span className="text-4xl">🏆</span>
          </div>
        </div>
      </div>
    </div>
  );
};
