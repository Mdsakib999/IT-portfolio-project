import { Bar } from "../Shared/Bar";
import { features } from "../../Data/featuresData";
export const Approach = () => {
  return (
    <div className="my-20 max-w-7xl mx-auto">
      <Bar />
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-2xl md:text-3xl">
          <span className="block mb-4">Our design and</span>
          <span className="block font-bold"> development approach</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 ">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 p-6 border border-gray-400 rounded-lg  shadow-sm transition hover:shadow-md"
          >
            <div
              className={`w-30 h-8 md:w-30 md:h-14 md:rounded-lg ${item.gradient}`}
            />
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
