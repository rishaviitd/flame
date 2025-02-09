import React from "react";
import { FaBook, FaBrain, FaLightbulb } from "react-icons/fa";
import { BsTranslate } from "react-icons/bs";
import { Link } from "react-router-dom";
import word from "./assets/word.png";
import paragraph from "./assets/paragraph.png";
import paige from "./assets/paige.png";
import hero from "./assets/macbook.png";
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
      {/* <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center fixed top-0 w-full z-50">
        <div className="flex items-center space-x-2">
          <FaBook className="text-blue-600 text-xl" />
          <span className="text-xl font-semibold text-blue-600">PaiGE</span>
        </div>
      </nav> */}

      {/* Landing Page Content */}
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          className="h-screen flex items-center bg-cover bg-center bg-no-repeat relative w-full"
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Darker overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/75"></div>

          {/* PaiGE Logo positioned in top left */}
          <div className="absolute top-6 left-8 flex items-center space-x-3 z-20">
            <FaBook className="text-blue-400 text-3xl" />
            <span className="text-3xl font-bold text-white tracking-wide">
              PaiGE
            </span>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Transform Your Reading Experience
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Struggling to understand complex texts? PaiGE helps you comprehend
              better, learn faster, and enjoy reading like never before.
            </p>
            <Link
              to="/app"
              className="bg-blue-500 text-white px-10 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
          </div>
        </div>
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="max-w-5xl mx-auto space-y-16">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3 flex justify-center">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Upload PDF
                  </button>
                </div>
                <div className="md:w-1/3">
                  <h3 className="text-2xl font-semibold mb-3">
                    1. Upload Your Content
                  </h3>
                  <p className="text-gray-600">
                    Upload any PDF document - textbooks, research papers,
                    novels, or articles.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <div className="flex gap-4 max-w-[500px]">
                    <img
                      src={word}
                      alt="Select text demonstration"
                      className="w-1/2 h-auto rounded-lg shadow-md"
                    />
                    <img
                      src={paragraph}
                      alt="Highlight demonstration"
                      className="w-1/2 h-auto rounded-lg shadow-md"
                    />
                  </div>
                </div>
                <div className="md:w-1/3">
                  <h3 className="text-2xl font-semibold mb-3">
                    2. Select Text
                  </h3>
                  <p className="text-gray-600">
                    Simply highlight any word or paragraph you want to
                    understand better.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <div className="max-w-[500px]">
                    <img
                      src={paige}
                      alt="AI response demonstration"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </div>
                <div className="md:w-1/3">
                  <h3 className="text-2xl font-semibold mb-3">
                    3. Get AI Insights
                  </h3>
                  <p className="text-gray-600">
                    Ask questions and receive instant, intelligent explanations.
                  </p>
                </div>
              </div>
            </div>
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
