import { PrimaryButton } from "../Shared/PrimaryButton";
import heroImage from "/assets/Hero-Wrapper.png";

export const ServiceBanner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-28 mx-auto max-w-7xl">
      <div className="flex flex-col gap-8 md:w-1/2">
        <h1 className="text-5xl">
          <span className="font-inknut block mb-4">
            Great{" "}
            <span className="bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Product{" "}
            </span>
            is
          </span>
          <span className="font-inter font-bold block">
            built by great{" "}
            <span className="bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              teams
            </span>
          </span>
        </h1>

        <p className="text-lg font-inter">
          We are a team of talented developers who are passionate about building
          great products. We help build and manage a team of world-class
          developers to bring your vision to life. We are a team of talented
          developers who are passionate about building great products.
        </p>

        <PrimaryButton className="w-1/2">Get Started</PrimaryButton>
      </div>
      <img src={heroImage} alt="banner image" className="md:w-1/2" />
    </div>
  );
};
