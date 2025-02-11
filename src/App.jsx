import React, { useState, useRef, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import ReactMarkdown from "react-markdown";
import select from "./assets/select.png";
import Navbar from "./components/navbar";
import { useLocation } from "react-router-dom"; // Import useLocation
import { useUser } from "./UserContext"; // Import useUser

const predefinedPrompts = [
  "Meaning of the word",
  "Explain the main concepts in simple terms with examples.",
  "What does this mean?",
];

export default function App() {
  const { user } = useUser(); // Access user from context
  const [pdfFile, setPdfFile] = useState(null);
  const [userQuestion, setUserQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [conversations, setConversations] = useState([]);
  const [showConversationsModal, setShowConversationsModal] = useState(false);
  const pdfViewerRef = useRef(null);
  const location = useLocation(); // Use useLocation to access location

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(URL.createObjectURL(file));
    }
  };

  const handleQuestionSubmit = async (prompt) => {
    setLoading(true);
    setError("");
    // Add disclaimer for the first request
    if (conversations.length === 0) {
      setResponse(
        "Please wait for about 15 seconds for the first request to process."
      );
    }
    try {
      const fullPrompt = `${copiedText}\n\n${prompt}`;
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from the server.");
      }

      const data = await response.json();
      setResponse(data.result);

      // Save conversation to local storage
      const newConversation = {
        id: Date.now(),
        selectedText: copiedText,
        question: prompt,
        answer: data.result,
        timestamp: new Date().toISOString(),
      };

      const updatedConversations = [...conversations, newConversation];
      setConversations(updatedConversations);
      localStorage.setItem(
        "conversations",
        JSON.stringify(updatedConversations)
      );
    } catch (err) {
      setError("Failed to generate response. Please try again.");
    } finally {
      setLoading(false);
      setUserQuestion("");
    }
  };

  const handleTextSelection = () => {
    const selectedText = window.getSelection().toString();
    const isInPdfViewer =
      pdfViewerRef.current &&
      pdfViewerRef.current.contains(window.getSelection().anchorNode);

    if (selectedText && isInPdfViewer) {
      setCopiedText(selectedText);
      setPopupVisible(true);
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setResponse("");
  };

  // Load conversations from local storage on component mount
  useEffect(() => {
    const savedConversations = localStorage.getItem("conversations");
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("touchend", handleTextSelection);
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("touchend", handleTextSelection);
    };
  }, []);

  // Add this new component for the conversations modal
  const ConversationsModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-4/5 max-w-4xl h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Previous Conversations
          </h2>
          <button
            onClick={() => setShowConversationsModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200"
            >
              <div className="text-sm text-gray-500 mb-2">
                {new Date(conv.timestamp).toLocaleString()}
              </div>
              <div className="font-medium text-gray-700 mb-4">
                <h3 className="text-lg font-semibold mb-2">Selected Text:</h3>
                <p className="p-3 bg-white rounded-lg">{conv.selectedText}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Question:
                </h3>
                <p className="text-gray-700">{conv.question}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Answer:</h3>
                <div className="prose prose-blue max-w-none">
                  <ReactMarkdown>{conv.answer}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {conversations.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No previous conversations found
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar
        onShowConversations={() => setShowConversationsModal(true)}
        username={user?.name}
        email={user?.email}
      />

      {/* PDF Upload Section */}
      {!pdfFile && (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-2 sm:p-4 bg-gradient-to-br from-blue-50 to-gray-50">
          <div className="bg-white p-3 sm:p-6 rounded-xl shadow-lg text-center w-[95%] sm:w-full max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {/* Left Side - Image */}
              <div className="w-full md:w-1/2">
                <div className="w-full max-w-sm mx-auto px-2">
                  <img
                    src={select}
                    alt="Select text while reading"
                    className="w-full h-auto object-contain rounded-lg shadow-md"
                    style={{ maxHeight: "300px" }}
                  />
                </div>
              </div>

              {/* Right Side - Instructions and Upload Combined */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                    How to Use Paige
                  </h3>

                  {/* Upload and Steps Combined */}
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 text-gray-600">
                    {/* Upload Section */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-sm">
                            1
                          </span>
                        </div>
                        <p className="text-xs text-left">
                          Upload your PDF document
                        </p>
                      </div>
                      <label className="cursor-pointer flex-shrink-0">
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handlePdfUpload}
                          className="hidden"
                        />
                        <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
                          Choose PDF File
                        </span>
                      </label>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-sm">
                          2
                        </span>
                      </div>
                      <p className="text-xs text-left">
                        Select text using your mouse while reading
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-sm">
                          3
                        </span>
                      </div>
                      <p className="text-xs text-left">
                        Ask questions about the selected text/paragraph
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <div
        className="flex-1 overflow-auto border-t border-gray-200"
        ref={pdfViewerRef}
      >
        {pdfFile ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} />
          </Worker>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
            <img
              src={select}
              alt="Select text while reading"
              className="max-w-2xl w-full object-contain"
            />
            <div className="text-center max-w-2xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                How to Use Paige
              </h3>
              <div className="flex flex-col md:flex-row justify-center gap-8 text-gray-600">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <p>Upload your PDF document</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <p>Select text while reading</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <p>Ask questions about the content</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popup for Copied Text and User Question */}
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-4/5 max-w-3xl h-auto max-h-[80vh] overflow-auto">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  Selected Text
                </h2>
                <p className="p-3 bg-gray-50 rounded-lg text-gray-700 border border-gray-200">
                  {copiedText}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  Ask a Question
                </h2>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    className="flex-grow border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Type your question here..."
                  />
                  <button
                    onClick={() => handleQuestionSubmit(userQuestion)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Ask Question"
                    )}
                  </button>
                </div>
              </div>

              {/* Predefined Prompts */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Quick Prompts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {predefinedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionSubmit(prompt)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition duration-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Response */}
              {response && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Response
                  </h3>
                  <ReactMarkdown className="prose prose-blue max-w-none text-gray-700">
                    {response}
                  </ReactMarkdown>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              <p className="text-sm text-gray-500 bg-yellow-100 p-2 rounded">
                Note: The first request may take 1-2 minutes to process.
              </p>
              <button
                onClick={handleClosePopup}
                className="w-full mt-4 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add the conversations modal */}
      {showConversationsModal && <ConversationsModal />}
    </div>
  );
}
