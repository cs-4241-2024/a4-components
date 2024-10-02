import React, { useState, useEffect } from 'react';
import './App.css'; // imports my custom CSS, including Bulma

const App = () => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Low');
    const [creationDate, setCreationDate] = useState('');
    const [dueDay, setDueDay] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [todos, setTodos] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDateValid, setIsDateValid] = useState(true);

    useEffect(() => {
        fetch('/docs', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    useEffect(() => {
        validateDates();
    }, [creationDate, dueDay]);

    const validateDates = () => {
        if (creationDate && dueDay) {
            let creationDateObj = new Date(creationDate);
            let dueDateObj = new Date(dueDay);
            if (dueDateObj < creationDateObj) {
                setErrorMessage('Check your date! The due date cannot be before the creation date.');
                setIsDateValid(false);
            } else {
                setErrorMessage('');
                setIsDateValid(true);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isDateValid) {
            const newTask = {
                task,
                priority,
                creationDate,
                dueDate: dueDay,
                dueTime,
                daysLeft: calculateDaysLeft(dueDay),
            };
            fetch('/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            })
                .then((response) => response.json())
                .then((insertedTask) => {
                    setTodos([...todos, insertedTask]);
                    resetForm();
                })
                .catch((error) => console.error('Error submitting task:', error));
        }
    };

    const calculateDaysLeft = (dueDay) => {
        let currentDate = new Date();
        let dueDate = new Date(dueDay);
        let timeDiff = dueDate.getTime() - currentDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    const resetForm = () => {
        setTask('');
        setPriority('Low');
        setCreationDate('');
        setDueDay('');
        setDueTime('');
    };

    const deleteTask = (taskId) => {
        fetch('/remove', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: taskId }),
        })
            .then(() => setTodos(todos.filter((todo) => todo._id !== taskId)))
            .catch((error) => console.error('Error deleting task:', error));
    };

    return (
        <div className="container">
            <h1 id="header" className="title has-text-centered">Make your own To-do List!</h1>

            {/* Display error message if dates are invalid */}
            {errorMessage && <div className="notification is-danger">{errorMessage}</div>}

            {/* To-do List Form */}
            <form id="addEvent" className="box form-box" onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Task</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Priority</label>
                    <div className="control">
                        <div className="select">
                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                required
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Creation Date</label>
                    <div className="control">
                        <input
                            className="input"
                            type="date"
                            id="creationDate"
                            value={creationDate}
                            onChange={(e) => setCreationDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Deadline</label>
                    <div className="control">
                        <input
                            className="input"
                            type="date"
                            id="dueDay"
                            value={dueDay}
                            onChange={(e) => setDueDay(e.target.value)}
                            required
                        />
                        <input
                            className="input"
                            type="time"
                            id="dueTime"
                            value={dueTime}
                            onChange={(e) => setDueTime(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="submit">
                    <button
                        id="submitButton"
                        className="button is-primary"
                        type="submit"
                        disabled={!isDateValid}
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* Display Submitted Tasks */}
            <div id="submittedTodo" className="container">
                {todos.length > 0 && (
                    <table className="centered-table">
                        <thead>
                        <tr>
                            <th>Task</th>
                            <th>Priority</th>
                            <th>Creation Date</th>
                            <th>Due Date</th>
                            <th>Days Left</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todos.map((task) => (
                            <tr key={task._id}>
                                <td>{task.task}</td>
                                <td>{task.priority}</td>
                                <td>{task.creationDate}</td>
                                <td>{task.dueDate}</td>
                                <td>{task.daysLeft}</td>
                                <td>
                                    <button
                                        className="button is-danger is-small"
                                        onClick={() => deleteTask(task._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default App;
