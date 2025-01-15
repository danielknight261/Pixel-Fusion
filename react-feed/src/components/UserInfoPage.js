import React from "react";
import { useNavigate } from "react-router-dom";

const UserInfoPage = () => {
  const navigate = useNavigate();

  // Mock user data
  const mockUser = {
    name: "Daniel Knight",
    email: "danielknight263@gmail.com",
    jobTitle: "Frontend Developer",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* User Information Card */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">User Information</h1>
        <p className="mb-2">
          <strong>Name:</strong> {mockUser.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {mockUser.email}
        </p>
        <p className="mb-4">
          <strong>Job Title:</strong> {mockUser.jobTitle}
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserInfoPage;
