import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Add = () => {
  const [task, setTask] = useState({
    title: "",
    desc: "",
    status: "Pending", // Default status
  });

  const [error, setError] = useState(""); // To hold error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear error when the user modifies the input
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Check if title and description are empty
    if (!task.title || !task.desc) {
      setError("Both title and description are required!"); // Show error message
      return; // Don't proceed if inputs are empty
    }

    try {
      await axios.post("http://localhost:8800/tasks", task); // Send task with status
      navigate("/"); // Navigate to the main page after adding task
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    navigate("/"); // Navigate back to the main page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4  hover:text-red-800 focus:outline-none"
        >
          <FaTimes className="text-teal-500 text-xl" />
        </button>

        <h1 className="text-2xl font-bold mb-4 text-center">Add New Task</h1>
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={task.title} // Bind value to state
          onChange={handleChange} // Call handleChange to update state
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {/* Description Input */}
        <input
          type="text"
          placeholder="Description"
          name="desc"
          value={task.desc} // Bind value to state
          onChange={handleChange} // Call handleChange to update state
          className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {/* Add Task Button */}
        <button
          onClick={handleClick}
          className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Add;
