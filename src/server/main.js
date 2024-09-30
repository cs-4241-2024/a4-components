import express from 'express';
import ViteExpress from 'vite-express';

const app = express();
let todos = [];

app.use(express.json());

// Helper function to sort todos by priority and deadline
const sortTodos = (todos) => {
  return todos.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority; // Higher priority first
    }
    return new Date(a.deadline) - new Date(b.deadline); // Earlier deadline first
  });
};

// Get all todos
app.get('/todos', (req, res) => {
  res.json(sortTodos(todos));
});

// Add a new todo
app.post('/add', (req, res) => {
  const { task, priority, deadline } = req.body;
  const id = Date.now().toString();
  todos.push({ id, task, priority: parseInt(priority), deadline, completed: false });
  res.json(sortTodos(todos));
});

// Update an existing todo
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { task, priority, deadline } = req.body;

  todos = todos.map(todo => 
    todo.id === id ? { ...todo, task, priority: parseInt(priority), deadline } : todo
  );
  res.json(sortTodos(todos));
});

// Toggle the completion state of a todo
app.put('/toggle/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  res.json(sortTodos(todos));
});

// Delete a todo
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== id);
  res.json(sortTodos(todos));
});

ViteExpress.listen(app, 3000, () => {
  console.log('Server is running on http://localhost:3000');
});
