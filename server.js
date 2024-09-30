import express from 'express';
import ViteExpress from 'vite-express';

const app = express();

// Initialize in-memory task data
let appdata = [
  { task: 'Complete assignment', priority: 1, created_at: '2024-09-08', deadline: '2024-09-09' },
  { task: 'Buy groceries', priority: 2, created_at: '2024-09-08', deadline: '2024-09-10' }
];

// Function to compute deadlines based on priority
function computeDeadline(task) {
  const creationDate = new Date(task.created_at);
  let daysToAdd = 1; // Default is 1 day for highest priority

  // More days for lower priority tasks
  if (task.priority === 2) {
    daysToAdd = 2;
  } else if (task.priority === 3) {
    daysToAdd = 3;
  }

  creationDate.setDate(creationDate.getDate() + daysToAdd);
  task.deadline = creationDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

app.use(express.json());

// Endpoint to fetch all tasks
app.get('/read', (req, res) => {
  res.json(appdata);
});

// Endpoint to add a new task
app.post('/add', (req, res) => {
  const newTask = req.body;
  newTask.created_at = new Date().toISOString().split('T')[0]; // Set the current date
  computeDeadline(newTask); // Compute the deadline based on priority
  appdata.push(newTask);
  res.json(appdata); // Send back the updated task list
});

// Endpoint to delete a task by task description
app.post('/delete', (req, res) => {
  const { task } = req.body; // Get the task name from the request body
  appdata = appdata.filter(item => item.task !== task); 
  res.json(appdata); 
});

// Start the server with ViteExpress
ViteExpress.listen(app, 3000, () => {
  console.log('Server is running on http://localhost:3000');
});