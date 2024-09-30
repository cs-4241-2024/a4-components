
import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home = ({ onLogout }) => {
    console.log("Home component rendered");

    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        const response = await fetch('/data');
        const data = await response.json();
        setTasks(data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleTaskSubmit = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleTaskDelete = async (id) => {
        await fetch(`/data/${id}`, { method: 'DELETE' });
        loadTasks();
    };

    return (
        <div className="bg-indigo-600 text-white font-sans flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl my-8">To-Do List</h1>

                <div className="flex flex-col items-center mb-6">
                    <div className="form-container bg-gray-800 rounded-lg p-8 mb-6 w-full max-w-2xl shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Create a Task</h2>
                        <TaskForm onTaskSubmit={handleTaskSubmit} />
                    </div>

                    <h2 className="text-3xl font-semibold my-6 text-center">Task List</h2>
                    <TaskList tasks={tasks} onTaskDelete={handleTaskDelete} />
                    <button onClick={onLogout} className="p-2 bg-red-600 hover:bg-red-500 rounded shadow">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Home;