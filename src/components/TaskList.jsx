import React from 'react';

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Created At</th>
                <th>Due Date</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((item) => (
                <tr key={item._id}>
                    <td>{item.task}</td>
                    <td>{item.description}</td>
                    <td>{item.priority}</td>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td>{item.due_date}</td>
                    <td>
                        <button onClick={() => onTaskUpdate(item._id)}>Edit</button>
                        <button onClick={() => onTaskDelete(item._id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TaskList;