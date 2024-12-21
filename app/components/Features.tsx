import { ShieldCheckIcon, FileTextIcon, LockIcon, GlobeIcon } from 'lucide-react';

const features = [
 {
    icon: <ShieldCheckIcon className="h-12 w-12 text-blue-500" />,
    title: 'AI-Powered Verification',
    description: 'Advanced machine learning algorithms detect document authenticity with 99% accuracy.',
  },
  {
    icon: <FileTextIcon className="h-12 w-12 text-green-500" />,
    title: 'Blockchain Security',
    description: 'Immutable document storage ensures complete transparency and prevents tampering.',
  },
  {
    icon: <LockIcon className="h-12 w-12 text-purple-500" />,
    title: 'Multi-Layer Authentication',
    description: 'Robust security with multi-factor authentication and role-based access control.',
  },
  {
    icon: <GlobeIcon className="h-12 w-12 text-red-500" />,
    title: 'Global Accessibility',
    description: 'Verify documents from anywhere, anytime with our cloud-based platform.',
  },
];

export default function Features() {
  return (
    <section id="Features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-black text-center mb-12">Our Key Features</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-black mb-3 font-serif">{feature.title}</h3>
              <p className="text-gray-600 font-sans">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
