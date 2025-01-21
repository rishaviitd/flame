import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(URL.createObjectURL(file)); // Create a blob URL for the uploaded PDF
    }
  };

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
                className="hidden" // Hide the default file input
              />
              <span className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200">
                Choose File
              </span>
            </label>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto border-t border-gray-300">
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
    </div>
  );
}
