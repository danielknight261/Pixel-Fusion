import React, { useState, useEffect } from "react";

const tabs = [
  { id: "all", label: "All Files" },
  { id: "images", label: "Images" },
  { id: "documents", label: "Documents" },
];

// Initial files including the images and PDF
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

const FileList = ({ onFileCountChange }) => {
  const [files, setFiles] = useState(initialFiles);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Update the file count based on the active tab
    onFileCountChange(files[activeTab].length);
  }, [activeTab, files, onFileCountChange]);

  const handleDeleteFile = (fileName) => {
    const isImage = files.images.includes(fileName);
    const fileType = isImage ? "images" : "documents";

    const updatedFiles = {
      ...files,
      all: files.all.filter((file) => file !== fileName),
      [fileType]: files[fileType].filter((file) => file !== fileName),
    };

    setFiles(updatedFiles);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Files</h2>
      <div className="flex mb-4 space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <ul className="space-y-4">
        {files[activeTab].map((file, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b last:border-none py-4"
          >
            {file.endsWith(".jpg") || file.endsWith(".png") ? (
              <div className="flex items-center gap-4">
                {/* Display image thumbnail */}
                <img
                  src={`/${file}`}
                  alt={file}
                  className="w-16 h-16 object-cover"
                />
                <span>{file}</span>
                {/* View and Download buttons for images */}
                <a
                  href={`/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View
                </a>
                <a
                  href={`/${file}`}
                  download
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Download
                </a>
              </div>
            ) : file.endsWith(".pdf") ? (
              <div className="flex items-center gap-4">
                {/* PDF File with View and Download Options */}
                <span>{file}</span>
                <a
                  href={`/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View
                </a>
                <a
                  href={`/${file}`}
                  download
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Download
                </a>
              </div>
            ) : (
              <span>{file}</span>
            )}
            <button
              onClick={() => handleDeleteFile(file)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
