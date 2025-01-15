import React from "react";
import { useNavigate } from "react-router-dom";

const ExitPage = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">You have exited the Feed.</h1>
      <button
        onClick={handleReturn}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Return to Feed
      </button>
    </div>
  );
};

export default ExitPage;
