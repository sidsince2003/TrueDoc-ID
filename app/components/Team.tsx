"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TeamPageSlider = () => {
  const teamMembers = [
    {
      name: "Nidhi Singh",
      role: "Head of Marketing",
      image: "/assets/nidhi.jpg",
      bio: "Creative marketing expert driving brand growth.",
    },
    {
      name: "Ashi Sharma",
      role: "CTO",
      image: "/assets//Ashi.jpg",
      bio: "Expert in AI and machine learning technologies.",
    },
    {
      name: "Shishir Shrivastava",
      role: "Design Director",
      image: "/assets//Shishir.jpeg.jpg",
      bio: "Award-winning designer with a passion for user experience.",
    },
    {
      name: "Zishan Khan",
      role: "Product Manager",
      image: "/assets//Zishan.jpg",
      bio: "Innovative product strategist with global market insights.",
    },
    
    {
      name: "Siddharth Sharma",
      role: "CEO & Founder",
      image: "/assets//Siddharth.JPG",
      bio: "Visionary leader with 15 years of tech industry experience.",
    },
    {
      name: "Sahil Patel",
      role: "Head of Marketing",
      image: "/assets//sahil.jpg",
      bio: "Creative marketing expert driving brand growth.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 1 > teamMembers.length - 3 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [teamMembers.length]);

  const visibleMembers = () => {
    const startIndex = currentIndex;
    const endIndex = startIndex + 3;

    if (endIndex > teamMembers.length) {
      return [
        ...teamMembers.slice(startIndex),
        ...teamMembers.slice(0, endIndex - teamMembers.length),
      ];
    }

    return teamMembers.slice(startIndex, endIndex);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? teamMembers.length - 3 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + 1 > teamMembers.length - 3 ? 0 : prev + 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12  h-screen flex items-center justify-center ">
      <div className="bg-white p-8 shadow-2xl border border-blue-100 w-full rounded-tl-[3rem] rounded-br-[3rem]">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-900">
          Meet Our <span className="text-blue-600">Leadership Team</span>
        </h2>

        <div className="relative w-full overflow-hidden">
          <div className="flex justify-center items-center space-x-6 relative">
            {/* Previous Navigation */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 z-10 p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            >
              <ChevronLeft className="text-blue-800" size={24} />
            </button>

            {visibleMembers().map((member, index) => (
              <div
                key={member.name}
                className={`transition-all duration-700 ease-in-out 
                  ${index === 1 ? "scale-100 z-10 opacity-100" : "scale-75 opacity-50 blur-[2px]"}
                  w-1/3 flex-shrink-0 text-center transform`}
              >
                <div className="relative max-w-xs border-4 border-blue-100 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 ease-in-out">
                  <div className="relative w-full aspect-square group">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 bg-blue-50 border-t border-blue-100">
                    <h4 className="text-lg font-bold text-blue-900 mb-1 capitalize">
                      {member.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}

            {/* Next Navigation */}
            <button
              onClick={handleNext}
              className="absolute right-0 z-30 p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            >
              <ChevronRight className="text-blue-800" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPageSlider;
