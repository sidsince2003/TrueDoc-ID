"use client";

import { useState, useEffect } from "react";

const Hero = () => {
  const images = [
    "/1.jpg", 
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-gray-100 mt-[80px]">
      {/* Image Slider */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ${
            index === currentIndex ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%", // Ensure it takes full width
            height: "100%", // Ensure it takes full height
          }}
        ></div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
      >
        &#8592; {/* Left Arrow */}
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
      >
        &#8594; {/* Right Arrow */}
      </button>
    </div>
  );
};

export default Hero;
// "use client";

// const Hero = () => {
//   return (
//     <div className="relative w-full h-[500px] mt-[80px]">
//       {/* Image Container */}
//       <div
//         style={{
//           backgroundImage: `url(/1.jpg)`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           width: "100%",
//           height: "100%",
//         }}
//         className="relative shadow-2xl rounded-lg"
//       ></div>
//     </div>
//   );
// };

// export default Hero;