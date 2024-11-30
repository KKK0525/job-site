import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";
import apiList from "../../../libs/apiList";
import { toast } from "react-toastify";

function GoogleLoginButton({ setUser, userType }) {
  const handleLoginSuccess = (response) => {
    const token = response.credential;

    // Send token and user type to backend for verification
    fetch(`${apiList.google}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, type: userType }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to authenticate with server");
        }
        return res.json();
      })
      .then((data) => {
        // console.log("Server response:", data);
        if (data.message === "successfully saved" || data.message === "User already exists") {
          toast.success(data.message);
          setUser(data); // Update parent component state
        } else {
          console.error("Unexpected server response:", data);
        }
      })
      .catch((err) => {
        console.error("Error during backend communication:", err);
      });
  };

  const handleLoginError = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </GoogleOAuthProvider>
  );
}

// Prop validation
GoogleLoginButton.propTypes = {
  setUser: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
};

export default GoogleLoginButton;
