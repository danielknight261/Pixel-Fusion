import React from "react";
import { useNavigate } from "react-router-dom";

const AddInfoPage = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Feature Coming Soon</h1>
        <p className="text-gray-600">
          This doesn’t do anything yet, it’s a path to nowhere. Why not go back?
          I've added lots of other working features.
        </p>
        <button
          onClick={handleReturn}
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Return to Feed
        </button>
      </div>
    </div>
  );
};

export default AddInfoPage;
