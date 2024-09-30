
import React, { useState } from 'react';

const TaskForm = ({ onTaskSubmit }) => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newTask = { task, description, priority, created_at: new Date().toISOString() };

        const response = await fetch('/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });

        if (response.ok) {
            const data = await response.json();
            onTaskSubmit(data);
            setTask('');
            setDescription('');
            setPriority('');
        } else {
            alert('Error adding task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
            >
                <option value="" disabled>Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;