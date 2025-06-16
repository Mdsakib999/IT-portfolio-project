import { Bar } from "../Shared/Bar";
import { PrimaryButton } from "../Shared/PrimaryButton";

export const AboutSection = () => {
  return (
    <section className="py-5 px-4 md:px-20 bg-white text-gray-800 max-w-7xl mx-auto">
      <div className="flex items-start justify-start">
        <Bar />
      </div>
      {/* Title */}
      <h2 className="text-4xl font-semibold mb-6">About Us</h2>
      <hr className="mb-10 border-gray-300" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <div>
          <p className="text-base leading-relaxed mb-6">
            Welcome to <strong>Exabyting</strong>, where innovation meets
            excellence in software solutions and education. Established in{" "}
            <strong>2025</strong> by{" "}
            <span className="text-yellow-600 font-medium">SM IT</span>, our
            company is dedicated to providing cutting-edge software services and
            empowering individuals through high-quality courses.
          </p>
          <PrimaryButton>More about us</PrimaryButton>
        </div>

        {/* Right Content: Aim / Mission / Progress */}
        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-semibold">Aim</h4>
            <p className="text-sm leading-relaxed mt-1">
              Empowering businesses through cutting-edge IT solutions, Exabyting
              aims to revolutionize industries. We strive to enhance efficiency,
              foster innovation, and exceed customer expectations.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Mission</h4>
            <p className="text-sm leading-relaxed mt-1">
              To provide unparalleled software solutions, foster learning
              through top-rated courses, and propel careers. Exabyting is
              dedicated to shaping a future where technology transforms lives.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Progress</h4>
            <p className="text-sm leading-relaxed mt-1">
              At Exabyting, progress is measured in the success stories of our
              clients. With a relentless pursuit of excellence, we continuously
              evolve, pushing boundaries in the IT and education sectors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
