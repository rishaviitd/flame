import React from "react";
import { FaBook } from "react-icons/fa"; // For book icon
import { BiHistory } from "react-icons/bi"; // For history/previous conversations
import { CgProfile } from "react-icons/cg"; // For profile icon

export default function Navbar({ onShowConversations, username, email }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center space-x-2">
              <FaBook className="text-blue-600 text-xl" />
              <span className="text-xl font-semibold text-blue-600">PaiGE</span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={onShowConversations}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Previous Conversations
            </button>
            <div className="flex items-center ml-4">
              <CgProfile className="text-blue-600 text-xl" />
              <div className="ml-2 text-gray-800">
                <span className="block font-semibold">{username}</span>
                <span className="block text-sm text-gray-600">{email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
