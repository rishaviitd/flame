import React, { useState, useRef, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const predefinedPrompts = [
  "meaning of the word",
  "Explain the main concepts in simple terms with examples.",
  "What does this mean?",
];

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [userQuestion, setUserQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const pdfViewerRef = useRef(null);
  const popupRef = useRef(null);

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(URL.createObjectURL(file));
    }
  };

  const handleQuestionSubmit = async (prompt) => {
    setLoading(true);
    setError("");
    try {
      const fullPrompt = `${copiedText}\n\n${prompt}`;
      const result = await model.generateContent(fullPrompt);
      const aiResponse = result.response.text();

      setResponse(aiResponse);
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

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("touchend", handleTextSelection);
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("touchend", handleTextSelection);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Centered PDF Upload Section */}
      {!pdfFile && (
        <div className="flex items-center justify-center flex-grow">
          <div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "black" }}
            >
              Upload the PDF you want to view
            </h2>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="hidden"
              />
              <span className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200">
                Choose File
              </span>
            </label>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <div
        className="flex-1 overflow-auto border-t border-gray-300"
        ref={pdfViewerRef}
      >
        {pdfFile ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} />
          </Worker>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Upload a PDF to display here.</p>
          </div>
        )}
      </div>

      {/* Popup for Copied Text and User Question */}
      {popupVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          ref={popupRef}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 max-w-3xl h-auto max-h-[80%] overflow-auto">
            <h2
              className="text-lg font-semibold mb-2"
              style={{ color: "black" }}
            >
              Selected Text
            </h2>
            <p className="mb-2" style={{ color: "black" }}>
              {copiedText}
            </p>
            <h2
              className="text-lg font-semibold mb-2"
              style={{ color: "black" }}
            >
              Your Question
            </h2>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                className="flex-grow border border-gray-300 p-2 rounded-lg text-black"
                placeholder="Type your question here..."
              />
              <button
                onClick={() => handleQuestionSubmit(userQuestion)}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
            {/* Predefined Prompts */}
            <div className="mb-4">
              {predefinedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionSubmit(prompt)}
                  className="mr-2 mb-2 bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
            {/* Display Response */}
            {response && (
              <div className="mt-4 p-2 border border-gray-300 rounded">
                <strong style={{ color: "black" }}>Response:</strong>
                <ReactMarkdown
                  style={{ color: "black" }}
                  components={{
                    p: ({ node, ...props }) => (
                      <p {...props} style={{ color: "black" }} />
                    ),
                  }}
                >
                  {response}
                </ReactMarkdown>
              </div>
            )}
            <button
              onClick={handleClosePopup}
              className="w-full mt-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
