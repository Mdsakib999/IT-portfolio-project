import React from "react";
import { PrimaryButton } from "../Shared/PrimaryButton";

export const HireBest = () => {
  return (
    <div className="bg-slate-200 rounded-2xl py-20 px-10 my-10">
      <div className="flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold max-w-xl leading-snug">
          Hire the best developers and designers around!
        </h1>
        <PrimaryButton className="block md:hidden px-4 py-2 bg-gradient-to-b from-[var(--color-yellow)] to-[var(--color-orange)]">
          Hire Now
        </PrimaryButton>
        <div className="hidden relative md:flex items-center justify-center min-h-[300px] rounded-xl">
          {/* Glowing rays */}
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-2 h-8 rounded-full bg-gradient-to-b from-[var(--color-yellow)] to-[var(--color-orange)]"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-120px)`,
                transformOrigin: "center center",
              }}
            />
          ))}

          {/* Button */}
          <button className="px-4 py-4 text-white font-semibold text-lg rounded-md bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-yellow)] shadow-lg hover:scale-105 transition-transform">
            Hire Top Developers
          </button>
        </div>{" "}
      </div>
    </div>
  );
};
