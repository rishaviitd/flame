import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "./UserContext"; // Import useUser

const clientId =
  "289665124994-nrqbif75i72v24v4bqcpma8cfem8mg92.apps.googleusercontent.com";

const Login = () => {
  const { setUser } = useUser(); // Get setUser from context
  const navigate = useNavigate();

  const onSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const email = decoded.email || "No email found";
    const name = decoded.name || "No name found";

    const userInfo = { email, name };
    setUser(userInfo); // Set user in context
    localStorage.setItem("user", JSON.stringify(userInfo)); // Store user info in local storage
    localStorage.setItem("token", credentialResponse.credential); // Store JWT token in local storage

    navigate("/app", {
      state: {
        user: userInfo,
      },
    });
  };

  const onFailure = (error) => {
    console.log("Login failed: res:", error);
    // Handle login failure here
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <GoogleLogin
          onSuccess={onSuccess}
          onFailure={onFailure}
          logo_alignment="left"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
