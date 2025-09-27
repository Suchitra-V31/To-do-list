import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();

    const handleIconClick = () => {
      navigate("/welcome");
    };
    return (
        <div className="min-h-screen bg-pink-300 flex items-center justify-center relative">
            {/* To-do list icon popup */}
            {(
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <img
                            src="https://png.pngtree.com/png-vector/20230122/ourmid/pngtree-to-do-list-icon-in-comic-style-document-checklist-cartoon-vector-illustration-on-white-isolated-background-notepad-check-mark-splash-effect-business-concept-vector-png-image_49383246.jpg"
                            alt="To-do list"
                            onClick={handleIconClick}
                            className="mx-auto mb-1"
                        />
                        <h2 className="text-xl font-semibold text-pink-600">Welcome to To-Do List</h2>
                        <p className="text-gray-600 mb-4">Manage your tasks with ease!</p>

                    </div>
                </div>
            )}
    </div>
  );
};

export default LandingPage;
