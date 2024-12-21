import React from "react";
import { 
  ShieldCheck, 
  Globe, 
  Lock, 
  Workflow 
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Verification",
      description: "Advanced AI-powered document authentication"
    },
    {
      icon: Globe,
      title: "Global Trust",
      description: "Recognized and trusted across multiple platforms"
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "End-to-end encryption for complete confidentiality"
    },
    {
      icon: Workflow,
      title: "Smart Workflow",
      description: "Streamlined document management process"
    }
  ];

  return (
    <section 
      id="About" 
      className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Subtle Background Blob */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />

      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto relative z-10">
        <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          {/* Text Content */}
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-indigo-700 text-4xl md:text-5xl font-bold font-manrope leading-tight lg:text-start text-center">
                    About TrueDoc
                  </h2>
                  <p className="text-gray-600 text-lg md:text-xl font-normal leading-relaxed lg:text-start text-center max-w-xl">
                    At TrueDoc, we're revolutionizing document verification through cutting-edge AI and Blockchain technology. Our platform transforms complex verification processes into simple, secure, and instantaneous experiences.
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                  >
                    <div className="flex items-center mb-4">
                      <feature.icon 
                        className="w-10 h-10 text-indigo-600 mr-4 group-hover:rotate-12 transition-transform"
                      />
                      <h3 className="text-xl font-semibold text-gray-800">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="w-full lg:justify-start justify-center items-start flex">
            <div className="relative group">
              <div className="absolute -inset-2 bg-indigo-200 rounded-3xl opacity-25 group-hover:opacity-50 transition-all duration-300 blur-xl"></div>
              <div className="sm:w-[564px] w-full sm:h-[546px] h-full bg-gray-100 rounded-3xl border border-gray-300 relative overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  src="/about.jpg.jpg"
                  alt="About TrueDoc"
                />
                <div className="absolute inset-0 bg-indigo-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Decoration */}
      <div 
        className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-indigo-50 to-transparent opacity-50"
      />
    </section>
  );
};

export default About;