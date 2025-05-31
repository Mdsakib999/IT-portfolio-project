import { PrimaryButton } from "../Shared/PrimaryButton";

export const HireBest = () => {
  return (
    <div className="bg-slate-200 rounded-2xl py-20 px-10 my-10">
      <div className="flex flex-col md:flex-row justify-around items-center gap-4 sm:gap-0">
        <h1 className="text-2xl">
          Hire the best developers and designers around!
        </h1>
        <PrimaryButton className="block md:hidden px-4 py-2 bg-gradient-to-b from-[var(--color-yellow)] to-[var(--color-orange)]">
          Hire Now
        </PrimaryButton>
        <div className="hidden relative md:flex items-center justify-center min-h-[130px] min-w-[100px] rounded-xl">
          {/* Glowing rays */}
          {Array.from({ length: 8 }).map(
            (_, i) =>
              i != 2 &&
              i != 6 && (
                <span
                  key={i}
                  className="absolute w-2 h-8 rounded-full bg-gradient-to-b from-[var(--color-yellow)] to-[var(--color-orange)]"
                  style={{
                    transform: `rotate(${i * 45}deg) translateY(-80px)`,
                    transformOrigin: "center center",
                  }}
                />
              )
          )}
          {/* Button */}
          <button className="px-4 py-4 text-white text-lg rounded-md bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-yellow)] shadow-lg hover:scale-105 transition-transform">
            Hire Top Developers
          </button>
        </div>{" "}
      </div>
    </div>
  );
};
