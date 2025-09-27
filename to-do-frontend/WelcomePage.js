import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const [showPopup] = useState(true);

    const navigate = useNavigate();
    const handleAccountClick = () =>{
        navigate("/createAccount")
    }
    const handleLoginClick = () => {
        navigate("/login")
    }
    const handleIconClick = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center text-center">

            {/* Login/Create Account Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-center">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome!</h2>
                        <p className="mb-6 text-gray-600">Login or create a new account to continue</p>
                        <div className="space-y-3">
                            <button onClick={handleLoginClick}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                                Login
                            </button>
                            <button  onClick={handleAccountClick} className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                                Create Account
                            </button>
                            <button
                                onClick={handleIconClick}
                                className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WelcomePage;
