import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Store JWT token
  const [email, setEmail] = useState(null); // Store user email
  const [error, setError] = useState(null); // Store any errors
  const [successMessage, setSuccessMessage] = useState("");

  // Login method
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        setError(null); // Clear any previous errors
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Register method
  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        setError(null); // Clear any previous errors
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout method
  const logout = () => {
    setToken(null);
    setEmail(null);
    setError(null); // Clear errors on logout
  };

  // Fetch authenticated user's profile
  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      return data; // Return profile data if needed
    } catch (err) {
      setError(err.message);
    }
  };

  const checkout = async (cart) => {
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cart),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        return data; // You can return user data if needed
      } else {
        throw new Error(data.message || "Checkout failed");
      }
    } catch (err) {
      setError(err.message);
      setSuccessMessage(""); // Clear success message on error
    }
  };

  const value = {
    token,
    email,
    login,
    register,
    logout,
    fetchProfile,
    checkout, // Add the checkout method here
    error,
    successMessage, // Optioal: error handling in UI
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
