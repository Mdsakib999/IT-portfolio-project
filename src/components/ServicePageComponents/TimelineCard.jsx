export const TimelineCard = ({ step, position }) => {
  return (
    <div
      className={`relative w-64 sm:w-80 p-4 bg-white rounded-xl shadow-md border ${
        position === "top" ? "mb-6" : "mt-6"
      }`}
    >
      <p className="text-sm font-bold text-pink-600">
        #{step.id} <span className="text-black">{step.title}</span>
      </p>
      <p className="text-sm text-gray-600 mt-2">{step.description}</p>
    </div>
  );
};
