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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

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
    <div className="max-w-7xl mx-auto px-6 py-16 bg-white">
      {/* Header Section */}
      <div className="flex flex-col items-start mb-16">
        <Bar />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Why customers love
        </h2>
        <h3 className="text-4xl font-bold text-gray-900">working with us</h3>
      </div>

      {/* Testimonial Content */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>

        {/* Main Content Area */}
        <div className="mx-16">
          {/* Quote and Text */}
          <div className="text-center mb-12">
            <Quote size={32} className="text-purple-600 mx-auto mb-6" />
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {testimonials[currentSlide].text}
            </p>
          </div>

          {/* Customer Avatars Row */}
          <div className="flex justify-center items-center gap-8 mb-8">
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentSlide;
              const isAdjacent =
                Math.abs(index - currentSlide) === 1 ||
                (currentSlide === 0 && index === testimonials.length - 1) ||
                (currentSlide === testimonials.length - 1 && index === 0);

              return (
                <div
                  key={testimonial.id}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "scale-125 z-10"
                      : isAdjacent
                      ? "scale-100 opacity-80"
                      : "scale-75 opacity-40"
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  <div
                    className={`relative ${
                      isActive ? "ring-4 ring-purple-400 ring-offset-2" : ""
                    } rounded-full transition-all duration-300`}
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>

                  {/* Active customer info */}
                  {isActive && (
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center w-32">
                      <StarRating rating={testimonial.rating} />
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-[200px]">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-purple-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
