import React, { useState } from 'react';

const TaskForm = ({ onAddAssignment }) => {
  // State to store the form values
  const [task, setTask] = useState({
    className: '',
    assignmentName: '',
    dueDate: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAssignment(task); // Call the onAddAssignment function
    setTask({ className: '', assignmentName: '', dueDate: '' }); // Reset form fields
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="className">Class Name</label>
      <input
        type="text"
        name="className"
        value={task.className}
        onChange={handleChange}
      />

      <label htmlFor="assignmentName">Assignment Name</label>
      <input
        type="text"
        name="assignmentName"
        value={task.assignmentName}
        onChange={handleChange}
      />

      <label htmlFor="dueDate">Due Date</label>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />

      <button type="submit">Add Assignment</button>
    </form>
  );
};

export default TaskForm;
