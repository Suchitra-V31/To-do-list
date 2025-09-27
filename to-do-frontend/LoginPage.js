import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [setShowPopup] = useState(false); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();
  const closePopup = () => {
    navigate("/welcome");
  };
  const goDashboard = () =>{
    navigate("/Dashboard");
  }

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    try {
        const response = await axios.post("http://localhost:5000/login", { email, password });
        const {user } = response.data;
        setMessage("Login successful!");
        goDashboard();
      console.log(response.data.token); 
      localStorage.setItem("userId", user.id);
      setShowPopup(false);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
      <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center text-center">
      {/* Login/Create Account Popup */}
      {(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
            <p className="mb-6 text-gray-600">Enter your email and password to log in</p>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Sign In
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

export default LoginPage;
