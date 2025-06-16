import { ArrowRight } from "lucide-react";
import { Bar } from "../Shared/Bar";
import { PrimaryButton } from "../Shared/PrimaryButton";

export const FeaturedResources = () => {
  const resources = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      title: "How to Build a Scalable Application up to 1 Million Users on AWS",
      readTime: "5 min read",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      title: "How to Build a Scalable Application up to 1 Million Users on AWS",
      readTime: "7 min read",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80",
      title: "How to Build a Scalable Application up to 1 Million Users on AWS",
      readTime: "6 min read",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "How to Build a Scalable Application up to 1 Million Users on AWS",
      readTime: "8 min read",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "How to Build a Scalable Application up to 1 Million Users on AWS",
      readTime: "4 min read",
    },
  ];

  return (
    <div className="px-6 py-16 bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-start mb-4 max-w-7xl mx-auto ">
        <Bar />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Featured Resources
        </h2>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto ">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className={`group cursor-pointer transition-all duration-300 hover:transform hover:scale-105 `}
          >
            {/* Card Container */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                  {resource.title}
                </h4>

                {/* Read More Button */}
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <button className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700 transition-colors duration-200 whitespace-nowrap">
                    <span>Read More</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                  <span className="text-sm text-gray-500">
                    {resource.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <PrimaryButton className="inline-flex items-center gap-2 hover:bg-purple-700 transition-all duration-200 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
          <span>View All Resources</span>
          <ArrowRight size={18} />
        </PrimaryButton>
      </div>
    </div>
  );
};
