import { PrimaryButton } from "../Shared/PrimaryButton";
import backgroundImage from "/assets/office-image.png";

export const AboutBanner = () => {
  return (
    <section className="relative h-[70vh] w-full">
      {/* Background image */}
      <img
        src={backgroundImage}
        alt="Team working on laptops"
        className="absolute inset-0 h-full w-full object-cover object-center rounded-lg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 flex items-center justify-center px-4 rounded-2xl">
        <div className="text-center text-white max-w-2xl pt-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug md:leading-tight mb-6">
            Implementing <br className="hidden sm:block" />
            <span className="bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent ">
              Software Solutions
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-8 font-light tracking-wide">
            Innovating Tomorrow’s Solutions, Today. <br />
            <span className="font-semibold">
              Exabyting — Your Trusted IT Partner
            </span>
          </p>

          <PrimaryButton className="group inline-flex items-center gap-2 px-6 py-3 bg-primary transition-transform transform hover:-translate-y-1 rounded-full">
            Let’s Get Started
            <span className="inline-block transform transition-transform group-hover:translate-x-1 group-hover:-rotate-45">
              →
            </span>
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};
