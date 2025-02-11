import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

const User = () => {
  const location = useLocation(); // Use useLocation to access location
  const { user } = location.state || {}; // Safely access user data

  if (!user) {
    return <div>No user data available</div>; // Handle case where user data is not available
  }

  return (
    <div>
      <h2>User Page</h2>
      <p>Email: {user.email}</p>
      <p>Username: {user.name}</p>
    </div>
  );
};

export default User;
