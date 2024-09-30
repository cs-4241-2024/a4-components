import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskRow from './TaskRow';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const response = await fetch('/tasks');
    const tasksData = await response.json();
    setTasks(tasksData);
  };

  const addTask = async (taskData) => {
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      loadTasks();
    }
  };

  const deleteTask = async (taskId) => {
    const response = await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
    if (response.ok) {
      loadTasks();
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="task-tracker-container">
      <h1>Task Tracker</h1>
      <TaskForm addTask={addTask} />
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Priority</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task._id} task={task} deleteTask={deleteTask} />
          ))}
        </tbody>
      </table>
      <button
        onClick={() =>
          fetch('/logout', { method: 'POST' }).then(() =>
            window.location.href = '/'
          )
        }
      >
        Logout
      </button>
    </div>
  );
};

export default TaskTracker;
