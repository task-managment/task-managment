import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function TaskForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("high");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };

    try {
      const response = await dispatch(addTask(newTask));
      dispatch(addTask(response.data));
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("high");
      navigate("/home");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <>
      <Header />
      <form
        className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Add Task</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter title"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-gray-700 font-bold mb-2"
          >
            Due Date:
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-gray-700 font-bold mb-2"
          >
            Priority:
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-pink-700 hover:bg-pink-800 p-2 rounded-md  focus:outline-none focus:ring focus:border-pink-300"
        >
          Add Task
        </button>
      </form>
    </>
  );
}

export default TaskForm;
