import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Set hardcoded user details
    const user = {
      firstName: "C",
      lastName: "H",
      initials: "CH",
    };

    setUser(user); // Save user data
    navigate("/"); // Redirect to the feed
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Mock Login Page</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value="C"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-1"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value="H"
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value="ch@pixel-fusion.com"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value="password123"
              disabled
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
