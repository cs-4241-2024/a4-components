import React, { useState } from 'react';
import './styles/styles.css';

const App = () => {
  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(1);
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString();

    const newTask = {
      name: name,
      task: task,
      priority: priority,
      date: date,
    };

    setTasks([...tasks, newTask]);
    setName('');
    setTask('');
    setPriority(1);
  };

  const handleDelete = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="App">
      <h1>CS4241 Assignment 2</h1>

      <form id="taskCreation" onSubmit={handleSubmit}>
        <label htmlFor="yourname">Name: </label>
        <input
          type="text"
          id="yourname"
          placeholder="your name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="task">Task: </label>
        <input
          type="text"
          id="task"
          placeholder="taskName"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <label htmlFor="priority">Priority: </label>
        <input
          type="number"
          id="priority"
          placeholder="1-10"
          min="1"
          max="10"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />

        <button type="submit" id="submit">Submit</button>
      </form>

      <h1>All Tasks</h1>
      <table id="taskList">
        <thead>
          <tr>
            <th>Name</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody id="taskBody">
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.name}</td>
              <td>{task.task}</td>
              <td>{task.priority}</td>
              <td>{task.date}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
