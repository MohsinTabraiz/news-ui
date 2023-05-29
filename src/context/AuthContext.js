import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token") || null;
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(initialToken);
  const [error, setError] = useState(null);

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/register",
        userData
      );
      const { token } = response.data.data;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.data) {
        const errorMessages = Object.values(err.response.data.data);
        setError(errorMessages.join("\n"));
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/login",
        userData
      );
      const { token } = response.data.data;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.data) {
        const errorMessages = Object.values(err.response.data.data);
        setError(errorMessages.join("\n"));
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    setError(null); // Reset error when location changes
  }, [location]);

  const authContextValues = {
    token,
    error,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};
