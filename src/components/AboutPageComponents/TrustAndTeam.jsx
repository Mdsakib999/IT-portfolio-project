import { ArrowRight, Play } from "lucide-react";
import { Bar } from "../Shared/Bar";

export const TrustAndTeam = () => {
  return (
    <div className="overflow-hidden my-20 max-w-7xl mx-auto">
      {/* First Section - Leading Companies Trust Us */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-36 w-32 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-b-full opacity-80"></div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10 flex flex-col items-start">
            <Bar />
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Leading companies trust us
              <br />
              <span className="text-gray-800">to develop software</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We add development capacity to tech teams. Our value isn't limited
              to building teams but is equally distributed across the project
              lifecycle. We are a custom software development company that
              guarantees the successful delivery of your project.
            </p>
            <button className="inline-flex items-center gap-2 text-purple-600 font-medium text-lg hover:text-purple-700 transition-colors duration-200 group">
              <span>See more informations</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Right Content - Video/Image */}
          <div className="relative">
            {/* Background Decorative Shape */}
            {/* <div className="absolute -top-8 -right-8 w-80 h-80 bg-gradient-to-bl from-purple-400 via-pink-400 to-yellow-300 rounded-3xl opacity-60 transform rotate-12"></div>
            <div className="absolute -bottom-4 -right-12 w-48 h-48 bg-gradient-to-br from-purple-600 to-pink-500 rounded-b-full opacity-40"></div> */}
            <div className="absolute -bottom-8 -right-5 w-96 h-96 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full opacity-80 animate-pulse"></div>

            {/* Main Image Container */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                alt="Team collaboration"
                className="w-full h-80 object-cover"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-purple-700 transition-all duration-200 hover:scale-110">
                  <Play
                    size={24}
                    className="text-white ml-1"
                    fill="currentColor"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Meet the People */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Decorative Elements for Second Section */}
        <div className="absolute bottom-0 right-0 w-48 h-24 bg-gradient-to-br from-purple-600 to-pink-500 rounded-t-full opacity-80"></div>
        <div className="absolute bottom-10 right-20 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-300 rounded-full opacity-40"></div>
      </div>
    </div>
  );
};
