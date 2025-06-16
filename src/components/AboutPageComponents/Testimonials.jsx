import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Bar } from "../Shared/Bar";

export const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Romeena De Silva",
      role: "Java Developer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      text: "Without any doubt I recommend Alcaline Solutions as one of the best web design and digital marketing agencies. One of the best agencies I've came across so far. Wouldn't be hesitated to introduce their work to someone else.",
    },
    {
      id: 2,
      name: "Romeena De Silva",
      role: "Java Developer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      text: "Exceptional service and outstanding results! The team delivered beyond our expectations and provided innovative solutions that transformed our business.",
    },
    {
      id: 3,
      name: "Imran Khan",
      role: "Software Engineer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      text: "Professional, reliable, and creative. Working with this team was a game-changer for our digital presence. Highly recommend their services!",
    },
    {
      id: 4,
      name: "Romeena De Silva",
      role: "Java Developer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      text: "Amazing attention to detail and customer service. They understood our vision perfectly and brought it to life with exceptional quality.",
    },
    {
      id: 5,
      name: "Romeena De Silva",
      role: "Java Developer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      text: "Top-notch professionalism and expertise. The results speak for themselves - our online presence has never been stronger!",
    },
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-white">
      {/* Header Section */}
      <div className="flex flex-col items-start mb-12">
        <Bar />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Why customers love
        </h2>
        <h3 className="text-4xl font-bold text-gray-900">working with us</h3>
      </div>

      {/* Main Testimonial Card */}
      <div className="bg-gray-50 shadow-md rounded-xl p-8 text-center transition-all duration-300">
        <div className="flex flex-col items-center gap-4">
          {/* Top Section: Avatar + Name/Role */}
          <div className="flex items-center gap-4">
            <img
              src={testimonials[currentSlide].avatar}
              alt={testimonials[currentSlide].name}
              className="w-16 h-16  rounded-full object-cover ring-4 ring-purple-400"
            />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800">
                {testimonials[currentSlide].name}
              </h3>
              <p className="text-sm text-gray-500">
                {testimonials[currentSlide].role}
              </p>
            </div>
          </div>

          {/* Rating */}
          <StarRating rating={testimonials[currentSlide].rating} />

          {/* Quote Icon */}
          <Quote size={28} className="text-purple-500 mb-2" />

          {/* Testimonial Text */}
          <p className="text-gray-600 max-w-2xl text-base italic">
            “{testimonials[currentSlide].text}”
          </p>
        </div>
      </div>

      {/* Avatar Selectors */}
      <div className="flex justify-center items-center gap-4 mt-8 overflow-x-auto px-2 scrollbar-hide p-5">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer md:w-16 md:h-16 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
              index === currentSlide
                ? "border-purple-500 scale-110"
                : "border-gray-300 opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
