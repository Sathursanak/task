import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Update = () => {
  // State to store task data
  const [task, setTask] = useState({
    title: "",
    desc: "",
    status: "Pending",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const taskId = location.pathname.split("/")[2];

  // Fetch task data when the component loads
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/tasks/${taskId}`);
        setTask(res.data); // Set the task data to state
      } catch (err) {
        console.log(err); // Log error if fetch fails
      }
    };
    fetchTask();
  }, [taskId]);

  // Handle input changes
  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission (update task)
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/tasks/${taskId}`, task); 
      navigate('/'); // Redirect to home page after updating
    } catch (err) {
      console.log(err); // Log error if update fails
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Task</h1>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={task.title} // Bind state to input
          onChange={handleChange} // Update state on input change
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700"
        />
        <input
          type="text"
          placeholder="Description"
          name="desc"
          value={task.desc} // Bind state to input
          onChange={handleChange} // Update state on input change
          className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700"
        />
        <button
          onClick={handleClick} // Call handleClick on submit
          className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Task
        </button>
      </div>
    </div>
  );
}

export default Update;
