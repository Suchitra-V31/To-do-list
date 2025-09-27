import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(""); // For signup
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const closePopup = () => {
    navigate("/welcome");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users", {
        userName,
        email,
        password,
      });
      setMessage("Account created successfully!");
      console.log(response.data);
      setTimeout(() => closePopup(), 1500); 
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during signup.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center text-center">
      {/* Popup */}
      {(
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Account</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Sign Up
              </button>
            </form>
            <button
              onClick={closePopup}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAccountPage;
