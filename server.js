import express from 'express';
import ViteExpress from 'vite-express';

const app = express();

let appdata = [
  { task: 'Complete assignment', priority: 1, created_at: '2024-09-08', deadline: '2024-09-09' },
  { task: 'Buy groceries', priority: 2, created_at: '2024-09-08', deadline: '2024-09-10' }
];


function computeDeadline(task) {
  const creationDate = new Date(task.created_at);
  let daysToAdd = 1; //Default is 1 day for highest priority

  if (task.priority === 2) {
    daysToAdd = 2;
  } else if (task.priority === 3) {
    daysToAdd = 3;
  }

  creationDate.setDate(creationDate.getDate() + daysToAdd);
  task.deadline = creationDate.toISOString().split('T')[0]; 
}

app.use(express.json());

app.get('/read', (req, res) => {
  res.json(appdata);
});

app.post('/add', (req, res) => {
  const newTask = req.body;
  newTask.created_at = new Date().toISOString().split('T')[0]; //Set the current date
  computeDeadline(newTask); 
  appdata.push(newTask);
  res.json(appdata); 
});


app.post('/delete', (req, res) => {
  const { task } = req.body; 
  appdata = appdata.filter(item => item.task !== task); 
  res.json(appdata); 
});

ViteExpress.listen( app, 3000 );