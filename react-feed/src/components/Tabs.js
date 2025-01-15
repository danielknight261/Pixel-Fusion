import React from "react";

const Tabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="flex">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
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
  );
};

export default Tabs;
