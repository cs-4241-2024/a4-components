import React, { useState, useEffect } from "react";
import './style.css';

const Todo = () => {
    const [tasks, setTasks] = useState([]); 
    const [newTask, setNewTask] = useState(''); 


    useEffect(() => {
        fetchTasks();
    }, []);


    const fetchTasks = () => {
        fetch('/tasks')
            .then(response => response.json())
            .then(tasks => {
                setTasks(tasks);  
            })
            .catch(error => console.error('Error fetching tasks:', error));
    };


    const addTask = () => {
        if (!newTask) {
            alert("Please insert a task before submitting");
            return;
        }

        fetch('/addTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: newTask })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Task added:', data);
            setTasks(prevTasks => [...prevTasks, { _id: data.insertedId, task: newTask }]);
            setNewTask(''); 
        })
        .catch(error => console.error('Error adding task:', error));
    };


    const deleteTask = (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }

        fetch('/deleteTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskId })
        })
        .then(response => response.text())
        .then(data => {
            console.log('Task deleted:', data);
            setTasks(tasks.filter(task => task._id !== taskId)); 
        })
        .catch(error => console.error('Error deleting task:', error));
    };


    const editTask = (taskId, taskText) => {
        const updatedTask = prompt("Edit task:", taskText);
        if (updatedTask) {
            setTasks(tasks.map(task => 
                task._id === taskId ? { ...task, task: updatedTask } : task
            ));
        }
    };


    return (
        <div className="container-lg">
            <p><a href="home.html">&lt; Back</a></p>
            <h1>To Do List</h1>
            <p>Please type in a task, and then once you are finished, you can cross it out or delete it</p>
            
            <div className="todo-container">
                <input 
                    type="text" 
                    className="input-item" 
                    id="input-box" 
                    placeholder="Add Task"
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} 
                />
                <button id="input-button" onClick={addTask}>Add Task</button>
            </div>

            <h2>Task List</h2>
            <ul id="list-container">
    {tasks.map(task => (
        <li key={task._id}> {}
            <label>
                <input 
                    type="checkbox" 
                    className="checkbox"
                    onClick={(e) => {
                        const taskElement = e.target.closest('li').querySelector('.taskSpan');
                        taskElement.style.textDecoration = e.target.checked ? 'line-through' : 'none';
                    }}
                />
            </label>
                    <span className="taskSpan">{task.task}</span>
                    <div className="button-container">
                        <span className="editButton" onClick={() => editTask(task._id, task.task)}>edit</span>
                        <span className="deleteButton" onClick={() => deleteTask(task._id)}>delete</span>
                    </div>
                </li>
            ))}
        </ul>

            <hr/>
        </div>
    );
};

export default Todo;
