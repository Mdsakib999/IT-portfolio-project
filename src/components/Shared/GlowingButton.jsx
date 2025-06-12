import React from "react";

export const GlowingButton = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[300px] rounded-xl">
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
      <button className="px-8 py-4 text-white font-semibold text-lg rounded-md bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-yellow)] shadow-lg hover:scale-105 transition-transform">
        Hire Top Developers
      </button>
    </div>
  );
};
