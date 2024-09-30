import React from "react";

const Task = ({ task }) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{task.task}</h3>
      <span className={`priority ${task.priority}`}>
        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
      </span>
      <div className="dates">
        <strong>Created At:</strong> {new Date(task.created_at).toLocaleString()}
        <br />
        <strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}
      </div>
    </div>
  );
};

export default Task;
