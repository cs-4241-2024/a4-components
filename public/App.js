import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = (task) => {
    fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((newTask) => setTasks([...tasks, newTask]));
  };

  const clearTasks = () => {
    fetch("/clear", { method: "POST" }).then(() => setTasks([]));
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} />
      <button onClick={clearTasks} className="clear-list">
        Clear All Tasks
      </button>
    </div>
  );
};

export default App;
