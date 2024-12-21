import { MailIcon, PhoneIcon } from 'lucide-react';

export default function Contact() {
  return (
    <section id="Contact" className="py-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-black text-center mb-12">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <div>
            <h3 className="text-2xl font-semibold text-black mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MailIcon className="h-8 w-8 text-blue-500 mr-4" />
                <span className="text-black">support@Truedoc.com</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-8 w-8 text-blue-500 mr-4" />
                <span className="text-black">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-lg text-black"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border rounded-lg text-black"
              />
              <textarea
                placeholder="Your Message"
                className="w-full px-4 py-3 border rounded-lg h-32 text-black"
              ></textarea>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
