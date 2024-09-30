import React from 'react';

// Main App component
class App extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = { 
      todos: [], 
      task: '',
      priority: '',
      deleteTask: ''
    };
  }

  // Load data from the server when the component mounts
  componentDidMount() {
    this.load();
  }

  load() {
    fetch('/read', { method: 'get', 'no-cors': true })
      .then(response => response.json())
      .then(json => {
        this.setState({ todos: json });
      });
  }

  // Render component HTML using JSX
  render() {
    return (
      <div className="App">
        <h1>To-Do List</h1>
        <table id="tasksTable" border="1" style={{ marginTop: '20px', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Priority</th>
              <th>Created At</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo, i) => (
              <tr key={i}>
                <td>{todo.task}</td> 
                <td>{todo.priority}</td>
                <td>{new Date(todo.created_at).toLocaleString()}</td>
                <td>{todo.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Add New Task</h2>
        <form onSubmit={(e) => this.addTask(e)} id="addTaskForm">
          <input 
            type="text" 
            value={this.state.task} 
            onChange={(e) => this.setState({ task: e.target.value })} 
            placeholder="Task Description" 
            required 
          />
          <input 
            type="number" 
            value={this.state.priority} 
            onChange={(e) => this.setState({ priority: e.target.value })} 
            placeholder="Priority (1-3)" 
            min="1" 
            max="3" 
            required 
          />
          <button type="submit">Add Task</button>
        </form>

        <h2>Delete Task</h2>
        <form onSubmit={(e) => this.deleteTask(e)} id="deleteTaskForm">
          <input 
            type="text" 
            value={this.state.deleteTask} 
            onChange={(e) => this.setState({ deleteTask: e.target.value })} 
            placeholder="Task Description to Delete" 
            required 
          />
          <button type="submit">Delete Task</button>
        </form>
      </div>
    );
  }

  // Add a new to-do task
  addTask(evt) {
    evt.preventDefault();
    const { task, priority } = this.state;

    const newTask = {
      task,          // Use 'task' as the task name
      priority,
      completed: false,
      created_at: new Date().toISOString().split('T')[0], // Set the current date
    };

    fetch('/add', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ todos: json, task: '', priority: '' });
      });
  }

  // Delete a to-do task
  deleteTask(evt) {
    evt.preventDefault();
    const { deleteTask } = this.state;
  
    fetch('/delete', { // Updated to '/delete' endpoint
      method: 'POST',
      body: JSON.stringify({ task: deleteTask }), // Send the task name to delete
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ 
          todos: json, // Update the state with the updated task list from the server
          deleteTask: ''
        });
      });
  }
}

export default App;