import React from "react";
import { FaBook, FaBrain, FaLightbulb } from "react-icons/fa";
import { BsTranslate } from "react-icons/bs";
import { Link } from "react-router-dom";

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaBook className="text-blue-600 text-xl" />
          <span className="text-xl font-semibold text-blue-600">PaiGE</span>
        </div>
      </nav>

      {/* Landing Page Content */}
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Reading Experience
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Struggling to understand complex texts? PaiGE helps you comprehend
              better, learn faster, and enjoy reading like never before.
            </p>
            <Link
              to="/app"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How PaiGE Helps You
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BsTranslate className="text-4xl text-blue-600" />}
              title="Instant Word Explanations"
              description="Get clear, contextual explanations for difficult words with just a click."
            />
            <FeatureCard
              icon={<FaBrain className="text-4xl text-blue-600" />}
              title="Smart Paragraph Summary"
              description="Understand complex paragraphs with AI-powered summaries and explanations."
            />
            <FeatureCard
              icon={<FaLightbulb className="text-4xl text-blue-600" />}
              title="Learning Enhancement"
              description="Improve vocabulary and comprehension skills as you read with interactive features."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Enhance Your Reading Experience?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of readers who have transformed their reading
              comprehension with PaiGE.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Try PaiGE Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
