import React from "react";
import { FaBook } from "react-icons/fa"; // For book icon
import { BiHistory } from "react-icons/bi"; // For history/previous conversations
import { CgProfile } from "react-icons/cg"; // For profile icon

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left side - Brand */}
      <div className="flex items-center space-x-2">
        <FaBook className="text-blue-600 text-xl" />
        <span className="text-xl font-semibold text-blue-600">PaiGE</span>
      </div>

      {/* Right side - Navigation buttons */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100">
          <BiHistory className="text-gray-600 text-xl" />
          <span className="text-gray-600">Previous Conversations</span>
        </button>

        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100">
          <CgProfile className="text-gray-600 text-xl" />
          <span className="text-gray-600">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
