const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URI;

let db, usersCollection, tasksCollection;

// MongoDB Connection
MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  db = client.db('task-app');
  usersCollection = db.collection('users');
  tasksCollection = db.collection('tasks');
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await usersCollection.findOne({ username });
  
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.session.userId = user._id;
  res.sendStatus(200);
});

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await usersCollection.findOne({ username });
  
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  await usersCollection.insertOne({ username, password });
  res.sendStatus(201);
});

// Check Auth Status
app.get('/auth/status', (req, res) => {
  if (req.session.userId) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Logout Route
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

// Task Routes
app.get('/tasks', async (req, res) => {
  const tasks = await tasksCollection.find().toArray();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = req.body;
  task.creationDate = new Date();
  await tasksCollection.insertOne(task);
  res.sendStatus(201);
});

app.delete('/tasks/:id', async (req, res) => {
  await tasksCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.sendStatus(200);
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
