export const TimelineStep = ({ id, title, subtitle, isTop }) => {
  return (
    <div
      className={`w-60 p-4 bg-white rounded-xl shadow border text-center ${
        isTop ? "mb-10" : "mt-10"
      }`}
    >
      <p className="text-sm font-bold text-pink-600">#{id}</p>
      <h4 className="font-semibold mt-1">{title}</h4>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
};
