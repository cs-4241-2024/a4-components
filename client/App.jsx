//import { useState } from "react";
//import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import React, { useState, useEffect } from 'react';

// Todo component to display individual tasks
const Todo = ({ todo, toggle, deleteTodo, editTodo, isBold }) => {
  // Apply styles based on priority and whether the task is completed
  const priorityClasses = {
    1: 'priority-1',
    2: 'priority-2',
    3: 'priority-3',
    4: 'priority-4',
    5: 'priority-5',
  };

  return (
    <li className={`${priorityClasses[todo.priority]} ${isBold ? 'deadline-soon' : ''} ${todo.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => toggle(todo.id)} />
      <span>{todo.task} (Due: {todo.deadline})</span>
      <button onClick={() => editTodo(todo)}>Edit</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

// Main App component
const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(1);
  const [deadline, setDeadline] = useState('');
  const [editingId, setEditingId] = useState(null); // Track the task being edited

  useEffect(() => {
    // Fetch the todos when the component mounts
    fetch('/todos')
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);

  // Add or edit a todo
  const addOrEditTodo = () => {
    if (editingId) {
      // Edit mode: update an existing todo
      fetch(`/update/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, priority, deadline }),
      })
        .then((response) => response.json())
        .then((json) => {
          setTodos(json); // Update the todo list in state with the new task list
        });
      setEditingId(null); // Reset editingId after editing
    } else {
      // Add mode: create a new todo
      fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, priority, deadline }),
      })
        .then((response) => response.json())
        .then((json) => setTodos(json));
    }

    // Reset the form fields after adding or editing
    setTask('');
    setPriority(1);
    setDeadline('');
  };

  // Toggle the completion state of a task
  const toggleTodo = (id) => {
    fetch(`/toggle/${id}`, { method: 'PUT' })
      .then((response) => response.json())
      .then((json) => setTodos(json));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    fetch(`/delete/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((json) => setTodos(json));
  };

  // Edit a todo: fill in the form fields with the current task data
  const editTodo = (todo) => {
    setTask(todo.task);
    setPriority(todo.priority);
    setDeadline(todo.deadline);
    setEditingId(todo.id); // Set the id of the task being edited
  };

  // Check if a deadline is within a week
  const isDeadlineSoon = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - today;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Task"
        />
        <label>
          Priority:
          <select value={priority} onChange={(e) => setPriority(parseInt(e.target.value))}>
            <option value="1">1 (Lowest)</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5 (Highest)</option>
          </select>
        </label>
        <label>
          Deadline:
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>
        <button onClick={addOrEditTodo}>{editingId ? 'Edit Todo' : 'Add Todo'}</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggle={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            isBold={isDeadlineSoon(todo.deadline)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;