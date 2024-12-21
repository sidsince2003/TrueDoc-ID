"use client"
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState<string>('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
        <p className="text-xl mb-8">Subscribe to our newsletter for the latest in document verification technology</p>
        <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto flex">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow px-4 py-3 rounded-l-lg text-gray-900"
          />
          <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded-r-lg hover:bg-green-600 transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
