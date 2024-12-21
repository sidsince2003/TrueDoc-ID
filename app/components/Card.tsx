"use client"
import React, { useState } from "react";
import { 
  User, 
  ShieldCheck, 
  Building2, 
  Globe, 
  ArrowRight, 
  Check 
} from "lucide-react";

const Card = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cardData = [
    {
      title: "Individual Sign",
      description: "Access your personal account and manage your profile.",
      details: [
        "Upload/Verify/Update personal documents",
        "Access secure digital drive",
        "View and download files",
        "Generate unique TrueDocId",
        "Secure document sharing",
      ],
      buttonText: "Sign In as Individual",
      icon: User,
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-700",
    },
    {
      title: "Authority Sign",
      description: "Securely access administrative and organizational accounts.",
      details: [
        "Comprehensive document scanning",
        "User ID verification",
        "Cross-database authentication",
        "Instant institute requests",
        "Secure access management",
      ],
      buttonText: "Sign In as Authority",
      icon: ShieldCheck,
      gradientFrom: "from-green-500",
      gradientTo: "to-green-700",
    },
    {
      title: "Institute Sign",
      description: "Manage and oversee organizational operations effectively.",
      details: [
        "Bulk document uploads",
        "Advanced user search",
        "Comprehensive verification tools",
        "Administrative controls",
        "Detailed reporting",
      ],
      buttonText: "Sign In as Institute",
      icon: Building2,
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-700",
    },
  ];

  return (
    <div className="relative isolate px-6 pt-24 pb-12 lg:px-8 flex flex-col items-center">
      {/* Background Gradient */}
      <div 
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" 
        aria-hidden="true"
      >
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-20 text-center">
        Choose Your Sign-In Option
      </h1>

      {/* Cards Container */}
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`
              bg-white rounded-2xl shadow-lg overflow-hidden 
              transition-all duration-300 
              transform 
              ${hoveredCard === index ? 'scale-105 shadow-2xl' : 'scale-100'}
              hover:scale-105 hover:shadow-2xl
              relative
              group
              border border-gray-100
            `}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Animated Gradient Border */}
            <div 
              className={`
                absolute inset-0 
                bg-gradient-to-r 
                ${card.gradientFrom} ${card.gradientTo}
                opacity-0 
                group-hover:opacity-20 
                transition-opacity 
                duration-300
              `}
            />

            <div className="p-8 text-center relative z-10">
              <div className="mb-6 flex justify-center">
                <div 
                  className={`
                    p-4 rounded-full 
                    bg-gradient-to-r 
                    ${card.gradientFrom} ${card.gradientTo}
                    text-white
                    transition-all 
                    duration-300 
                    group-hover:rotate-12
                    group-hover:scale-110
                  `}
                >
                  <card.icon className="w-12 h-12" />
                </div>
              </div>
              
              <h2 className="text-3xl font-semibold text-gray-900 mb-4 transition-colors">
                {card.title}
              </h2>
              <p className="text-gray-600 mb-4 h-16 line-clamp-3">
                {card.description}
              </p>
              
              <ul className="list-none text-gray-600 text-left px-6 mb-6 space-y-2">
                {card.details.map((detail, i) => (
                  <li 
                    key={i} 
                    className="flex items-center space-x-2 group-hover:text-gray-800"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="px-8 pb-8">
              <a
                href="#"
                className={`
                  inline-flex items-center justify-center 
                  w-full rounded-lg 
                  bg-gradient-to-r 
                  ${card.gradientFrom} ${card.gradientTo}
                  px-4 py-3 
                  text-sm font-medium text-white 
                  shadow-md 
                  hover:shadow-xl 
                  transition-all duration-300 
                  group-hover:opacity-90
                  relative
                  overflow-hidden
                `}
              >
                <span className="z-10 flex items-center">
                  {card.buttonText}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" 
        aria-hidden="true"
      >
        <div 
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80caff] to-[#4f46e5] opacity-30"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
    </div>
  );
};

export default Card;