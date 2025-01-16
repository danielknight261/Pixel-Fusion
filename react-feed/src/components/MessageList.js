import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuChevronDown } from "react-icons/lu";

const initialMessages = [
  {
    id: 1,
    channel: "#[Channel name]",
    initials: "CN",
    surname: "Clark",
    date: "Nov 21st, 2024 at 12:54 PM",
    text: "CS29039, can't find the current id.",
  },
  {
    id: 2,
    channel: "#[Channel name]",
    initials: "CN",
    surname: "Clark",
    date: "Nov 21st, 2024 at 12:23 PM",
    text: "CS29039, found it can you please check whether this is relevant?",
  },
  {
    id: 3,
    channel: "#[general]",
    initials: "CN",
    surname: "Clark",
    date: "Nov 17th, 2024 at 01:54 PM",
    text: "Somethings work, somethings dont",
  },
  {
    id: 4,
    channel: "#[updates]",
    initials: "CN",
    surname: "Clark",
    date: "Oct 21st, 2024 at 11:50 PM",
    text: "Don't forget to check the files section.",
  },
  {
    id: 5,
    channel: "#[react]",
    initials: "CN",
    surname: "Clark",
    date: "Dec 19th, 2024 at 07:54 AM",
    text: "React and Tailwind are great together!",
  },
  {
    id: 6,
    channel: "#[features]",
    initials: "CN",
    surname: "Clark",
    date: "Jan 16th, 2025 at 09:10 AM",
    text: "Search functionality is now live!",
  },
];

const MessageList = ({ searchQuery, onMessageCountChange }) => {
  const [messages] = useState(initialMessages);
  const [filters, setFilters] = useState({
    from: "",
    in: "",
    date: null,
    relevance: "",
  });
  const [dropdowns, setDropdowns] = useState({
    from: false,
    in: false,
    date: false,
    relevance: false,
  });

  const dropdownRefs = {
    from: useRef(null),
    in: useRef(null),
    date: useRef(null),
    relevance: useRef(null),
  };

  const uniqueSenders = Array.from(new Set(messages.map((msg) => msg.surname)));
  const uniqueChannels = Array.from(
    new Set(messages.map((msg) => msg.channel))
  );

  const toggleDropdown = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setDropdowns((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleClickOutside = (event) => {
    for (const key in dropdownRefs) {
      if (
        dropdownRefs[key].current &&
        !dropdownRefs[key].current.contains(event.target)
      ) {
        setDropdowns((prev) => ({ ...prev, [key]: false }));
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredMessages = messages
    .filter((message) => {
      const { from, in: channel, date } = filters;

      if (from && message.surname !== from) return false;
      if (channel && message.channel !== channel) return false;
      if (date && message.date !== date.toISOString().split("T")[0])
        return false;

      // Check search query across all fields
      if (
        searchQuery &&
        !(
          message.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.initials.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.date.includes(searchQuery) || // Dates are case-sensitive, so no lowercase
          message.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.relevance === "most-recent") {
        return new Date(b.date) - new Date(a.date);
      } else if (filters.relevance === "alphabetical") {
        return a.text.localeCompare(b.text);
      }
      return 0;
    });

  // Update the count of filtered messages
  useEffect(() => {
    onMessageCountChange(filteredMessages.length);
  }, [filteredMessages, onMessageCountChange]);

  return (
    <div className="bg-white">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* From Filter */}
        <div className="relative" ref={dropdownRefs.from}>
          <div
            onClick={() => toggleDropdown("from")}
            className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-300 cursor-pointer"
          >
            From
            <LuChevronDown className="ml-2" />
          </div>
          {dropdowns.from && (
            <div className="absolute mt-2 bg-white border border-gray-300 p-2 rounded shadow">
              {uniqueSenders.map((sender) => (
                <div
                  key={sender}
                  onClick={() => handleFilterChange("from", sender)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {sender}
                </div>
              ))}
              <div
                onClick={() => handleFilterChange("from", "")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All
              </div>
            </div>
          )}
        </div>

        {/* In Filter */}
        <div className="relative" ref={dropdownRefs.in}>
          <div
            onClick={() => toggleDropdown("in")}
            className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-300 cursor-pointer"
          >
            In
            <LuChevronDown className="ml-2" />
          </div>
          {dropdowns.in && (
            <div className="absolute mt-2 bg-white border border-gray-300 p-2 rounded shadow">
              {uniqueChannels.map((channel) => (
                <div
                  key={channel}
                  onClick={() => handleFilterChange("in", channel)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {channel}
                </div>
              ))}
              <div
                onClick={() => handleFilterChange("in", "")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All
              </div>
            </div>
          )}
        </div>

        {/* Date Filter */}
        <div className="relative" ref={dropdownRefs.date}>
          <div
            onClick={() => toggleDropdown("date")}
            className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-300 cursor-pointer"
          >
            Date
            <LuChevronDown className="ml-2" />
          </div>
          {dropdowns.date && (
            <div className="absolute mt-2 bg-white border border-gray-300 p-2 rounded shadow">
              <DatePicker
                selected={filters.date}
                onChange={(date) => handleFilterChange("date", date)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholderText="Select a date"
                dateFormat="yyyy-MM-dd"
              />
              <div
                onClick={() => handleFilterChange("date", null)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center"
              >
                Clear Date
              </div>
            </div>
          )}
        </div>

        {/* Most Relevant Filter */}
        <div
          className="relative ml-auto hidden md:block"
          ref={dropdownRefs.relevance}
        >
          <div
            onClick={() => toggleDropdown("relevance")}
            className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-300 cursor-pointer"
          >
            Most Relevant
            <LuChevronDown className="ml-2" />
          </div>
          {dropdowns.relevance && (
            <div className="absolute mt-2 bg-white border border-gray-300 p-2 rounded shadow right-0">
              <div
                onClick={() => handleFilterChange("relevance", "most-recent")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Most Recent
              </div>
              <div
                onClick={() => handleFilterChange("relevance", "alphabetical")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Alphabetical
              </div>
              <div
                onClick={() => handleFilterChange("relevance", "")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Default
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message List */}
      {filteredMessages.map((message) => (
        <div
          key={message.id}
          className="border border-gray-300 rounded p-4 mb-4"
        >
          <p className="text-gray-500 text-sm font-bold">{message.channel}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="rounded-lg border border-gray-400 p-1 text-gray-800 font-semibold">
              {message.initials}
            </span>
            <span className="text-gray-500 text-sm">
              {message.surname} | {message.date}
            </span>
          </div>
          <p className="text-gray-800 mt-2 pl-10">{message.text}</p>
        </div>
      ))}
      {filteredMessages.length === 0 && (
        <p className="text-gray-500">No messages found.</p>
      )}
    </div>
  );
};

export default MessageList;
