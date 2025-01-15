import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageList from "./MessageList";
import FileList from "./FileList";

import {
  LuPanelLeftOpen,
  LuLogIn,
  LuMessageSquare,
  LuUsers,
  LuHouse,
  LuMessagesSquare,
  LuFiles,
  LuSearch,
  LuCirclePlus,
  LuMessageCircle,
} from "react-icons/lu";

// Initial files for initializing file count
const initialFiles = {
  all: [
    "DanielKnightFrontendCV25.pdf",
    "image1.jpg",
    "image2.jpg",
    "HiImDan.jpg",
  ],
  images: ["image1.jpg", "image2.jpg", "HiImDan.jpg"],
  documents: ["DanielKnightFrontendCV25.pdf"],
};

const Feed = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("messages");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [fileCount, setFileCount] = useState(initialFiles.all.length); // Initialize file count

  const handleLogout = () => setUser(null);
  const handleLogin = () => setUser({ initials: "CH" });

  return (
    <div className="min-h-screen flex relative">
      {user && (
        <div className="absolute top-0 left-0 h-full w-16 border-r border-gray-300 flex flex-col items-center py-4 bg-white">
          <div
            className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center border-b border-gray-300 cursor-pointer"
            onClick={() => navigate("/exit")}
            title="Exit"
          >
            <LuPanelLeftOpen size={24} />
          </div>
          <div className="mt-16 flex flex-col items-center">
            <LuMessageSquare className="mb-4" size={24} />
            <LuUsers className="mb-4" size={24} />
          </div>
        </div>
      )}

      <div className="flex-1 ml-16">
        <div className="relative h-16 bg-white flex items-center px-4 border-b border-gray-300 z-10">
          <h1 className="text-2xl font-bold text-gray-800">Feed</h1>
          <div className="flex-grow flex justify-center ml-8">
            <div className="relative w-full max-w-[350px]">
              <LuSearch
                size={20}
                className="absolute left-3 top-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded px-10 py-2 w-full"
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 h-16 flex items-center justify-end px-4">
            {user ? (
              <div
                className="w-10 h-10 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center font-bold cursor-pointer hover:bg-blue-500 hover:text-white"
                onClick={handleLogout}
                title="Logout"
              >
                {user.initials}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center text-blue-500 hover:text-white hover:bg-blue-500 px-4 py-2 rounded border border-blue-500"
              >
                <LuLogIn className="mr-2" />
                Login
              </button>
            )}
          </div>
        </div>

        {user ? (
          <div
            className="flex h-[calc(100vh-6rem)] border border-gray-300 rounded-lg mr-5"
            style={{ marginTop: "20px", marginLeft: "20px" }}
          >
            <div className="w-16 border-r border-gray-300 flex flex-col items-center py-4 bg-gray-100 justify-between rounded-tl-lg rounded-bl-lg">
              <div className="flex flex-col items-center">
                <div
                  className={`mb-6 cursor-pointer hover:text-blue-500 ${
                    activeTab === "home" ? "bg-white rounded-lg p-3" : ""
                  }`}
                  onClick={() => setActiveTab("home")}
                >
                  <LuHouse size={24} title="Home" />
                </div>
                <div
                  className={`mb-6 cursor-pointer hover:text-blue-500 ${
                    activeTab === "messages" ? "bg-white rounded-lg p-3" : ""
                  }`}
                  onClick={() => setActiveTab("messages")}
                >
                  <LuMessagesSquare size={24} title="Messages" />
                </div>
                <div
                  className={`mb-6 cursor-pointer hover:text-blue-500 ${
                    activeTab === "files" ? "bg-white rounded-lg p-3" : ""
                  }`}
                  onClick={() => setActiveTab("files")}
                >
                  <LuFiles size={24} title="Files" />
                </div>
              </div>
              <div className="mb-4">
                <LuCirclePlus
                  className="cursor-pointer hover:text-blue-500"
                  size={24}
                  title="Add"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col bg-white rounded-tr-lg rounded-br-lg">
              <div className="flex items-center mb-4 border-b border-gray-300 pt-2 px-20">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab("messages")}
                    className={`flex items-center px-4 py-2 pb- ${
                      activeTab === "messages"
                        ? "border-b-2 border-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    <LuMessageCircle className="mr-2" size={18} />
                    Messages
                    <span className="ml-2 text-gray-500">({messageCount})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("files")}
                    className={`flex items-center px-4 py-2 pb-2 ${
                      activeTab === "files"
                        ? "border-b-2 border-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    <LuFiles className="mr-2" size={18} />
                    Files
                    <span className="ml-2 text-gray-500">({fileCount})</span>
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto h-full px-20 py-4">
                {activeTab === "messages" ? (
                  <MessageList
                    searchQuery={searchQuery}
                    onMessageCountChange={setMessageCount}
                  />
                ) : (
                  <FileList onFileCountChange={setFileCount} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-xl">
              Please log in to access the feed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
