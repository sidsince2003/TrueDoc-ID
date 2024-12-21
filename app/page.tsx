import Header from "../app/components/Header";
import Hero from "../app/components/Hero";
import Features from "../app/components/Features";

import Card from "../app/components/Card";
import Contact from "../app/components/Contact";
import Footer from "../app/components/Footer";
import Team from "../app/components/Team";
import About from "../app/components/About";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      <Header />
      <Hero />
      <Card />
      <About />
      <Team />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
}
