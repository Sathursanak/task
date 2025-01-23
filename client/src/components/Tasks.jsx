import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import SearchBar from "./SearchBar";


const Tasks = () => {
  // to hold tasks data
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [showPending, setShowPending] = useState(false);

  // Fetch all tasks from the backend
  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tasks");
        setTasks(res.data); // Set fetched tasks to state
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTasks();
  }, []); // This will run once when the component mounts

  // to handle task deleting
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/tasks/${id}`);
      // Remove the deleted task from local state instead of reloading the page
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // task completion status
  const toggleTaskCompletion = async (taskId, currentStatus) => {
    const newStatus = currentStatus === "Completed" ? "Pending" : "Completed"; // Toggle status

    try {
      await axios.put(`http://localhost:8800/tasks/status/${taskId}`, {
        status: newStatus, // Send updated status to backend
      });

      // Update local state to reflect the change
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) // search for tasks
  );

  const pendingTasks = filteredTasks.filter((task) => 
    task.status === "Pending"); // Filter pending tasks

  return (
    <div className="p-6 bg-gray-200 min-h-screen rounded-lg ">
      <button className=" bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700 mb-4">
        <Link to="/add" className="font-bold">Add Task +</Link>
      </button>
      <h1 className="text-teal-500 text-3xl font-bold my-6 text-center">Task-Manager</h1>
       {/* Search Bar Component */}
       <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
       
       {/* Toggle Pending Tasks Button */}


<div className="flex justify-between items-center gap-4">
  <span>Total Tasks: {tasks.length}</span>
  <span>Pending Tasks: {pendingTasks.length}</span>
</div>

<button
  onClick={() => setShowPending(!showPending)}
  className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700 mb-4"
>
  {showPending ? "Show All Tasks" : "Show Pending Tasks"}
</button>

<div className="space-y-6">
        {(showPending ? pendingTasks : filteredTasks).map((task) => (
          <div
            className="bg-white p-4 rounded-lg border-2 border-teal-500"
            key={task.id}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-gray-600 my-2">{task.desc}</p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.status === "Completed"}
                    onChange={() => toggleTaskCompletion(task.id, task.status)}
                    className="mr-2"
                  />

                  <span className={`block text-sm font-medium text-black`}>
                    Status:{" "}
                    <span
                      className={
                        task.status === "Completed"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }
                    >
                      {task.status}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700">
                  <Link to={`/update/${task.id}`}><PencilIcon className="h-5 w-5 text-white" /></Link>
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                 <TrashIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
