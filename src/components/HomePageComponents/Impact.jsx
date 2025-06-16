/* eslint-disable no-unused-vars */
import { IoIosPeople } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { FaLaptopCode } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatBox = ({ icon: Icon, end, suffix, label }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false, // allow retrigger
  });

  return (
    <div ref={ref} className="flex flex-col items-center min-w-[120px]">
      <Icon size={40} className="text-purple" />
      <div className="text-center mt-5">
        {inView ? (
          <CountUp key={Date.now()} start={0} end={end} delay={0}>
            {({ countUpRef }) => (
              <div>
                <span
                  className="font-bold text-lg font-sans mb-2"
                  ref={countUpRef}
                />
                {suffix}
              </div>
            )}
          </CountUp>
        ) : (
          <div className="font-bold text-lg font-sans mb-2">0{suffix}</div>
        )}
        <p className="text-sm">{label}</p>
      </div>
    </div>
  );
};

const Impact = () => {
  return (
    <div className="py-10 mt-10 px-4 max-w-7xl mx-auto ">
      <div className="space-y-3 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          Turning Ideas Into{" "}
          <span className="bg-gradient-to-br from-[#DE4396] to-[#0D1C9F] bg-clip-text text-transparent">
            Impact
          </span>
        </h1>
        <p className="text-sm md:text-base max-w-lg mx-auto mt-6">
          Together, we combine expertise and passion to create cutting-edge
          solutions that inspire growth and lead to lasting success.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-12 lg:px-16">
        <StatBox
          icon={IoIosPeople}
          end={1000}
          suffix="+"
          label="Happy Clients"
        />
        <StatBox
          icon={FaLaptopCode}
          end={100}
          suffix="+"
          label="Finished Projects"
        />
        <StatBox icon={TiTick} end={99} suffix="%" label="Satisfaction Rate" />
        <StatBox
          icon={FaClock}
          end={10}
          suffix="+"
          label="Years of Experience"
        />
      </div>
    </div>
  );
};

export default Impact;
