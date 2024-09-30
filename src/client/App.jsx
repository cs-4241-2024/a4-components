import React, { useState, useEffect } from 'react';

const Todo = ({ ToDo, type, date, priority, onDelete }) => (
  <tr>
    <td>{ToDo}</td>
    <td>{type}</td>
    <td>{date}</td>
    <td>{priority}</td>
    <td>
      <button onClick={onDelete}>Delete</button>
    </td>
  </tr>
);

const App = () => {
  const [todos, setTodos] = useState([]);

  function add(e) {
    e.preventDefault(); 
    const input = document.querySelector('#ToDo').value; // Get value of ToDo input
    const input2 = document.querySelector('#type').value; // Get value of type select
    const input3 = document.querySelector('#date').value; // Get value of date input

    fetch('/add', {
      method: 'POST',
      body: JSON.stringify({ ToDo: input, type: input2, date: input3 }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(json => {
      setTodos(json); 
    });
  }

  const deleteTodo = (priority) => {
    fetch('/delete', {
      method: 'POST',
      body: JSON.stringify({ priority }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(json => {
      setTodos(json); 
    });
  };

  useEffect(() => {
    fetch('/read')
      .then(response => response.json())
      .then(json => {
        setTodos(json);
      });
  }, []);

  useEffect(() => {
    document.title = `${todos.length} todo(s)`;
  }, [todos.length]);

  return (
    <div className="App">
      <form className="vertical-form" onSubmit={add}>
        <label htmlFor="ToDo">Item To Do:</label>
        <input type="text" id="ToDo" placeholder="Enter a to-do item" required />

        <label htmlFor="type">Type of Work:</label>
        <select name="type" id="type" required>
          <option value="school">School</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>

        <label htmlFor="date">Due Date:</label>
        <input type="date" id="date" required />

        <button type="submit">Add</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ToDo</th>
            <th>Type</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, i) => (
            <Todo 
              key={i} 
              ToDo={todo.ToDo} 
              type={todo.type} 
              date={todo.date} 
              priority={todo.priority}
              onDelete={() => deleteTodo(todo.priority)} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
