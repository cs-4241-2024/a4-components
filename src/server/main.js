import express from 'express';
import ViteExpress from 'vite-express'; // Import ViteExpress
import { MongoClient, ServerApiVersion } from 'mongodb';
import cookie from 'cookie-session';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST}`;


let collection = null;
let namesCollection = null;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  const conn = await client.connect();
  collection = await conn.db("GuestList").collection("authentication");
  namesCollection = await conn.db("GuestList").collection("guests");
}
run().catch(console.dir);

// Cookie middleware for session handling
app.use(
  cookie({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 5 * 60 * 1000, // 5 minutes
  })
);

// POST route for login
app.post('/login', async (req, res) => {
  console.log(uri);
  const { username, password } = req.body;
  if (collection !== null) {
    const user = await collection.findOne({ username });
    if (user && user.password === password) {
      req.session.username = username;
      req.session.login = true;
      res.json({ success: true, message: 'User authenticated' });
    } else {
      res.json({ fail: true, message: 'Invalid credentials' });
    }
  } else {
    res.status(500).json({ success: false, message: 'Database connection error' });
  }
});

// GET route to check authentication
app.get('/protected', (req, res) => {
  if (req.session && req.session.login) {
    res.json({ success: true, message: 'Authenticated' });
  } else {
    res.status(401).json({ success: false, message: 'Not authenticated' });
  }
});

// PUT route to edit a guest's name
app.put('/editName', async (req, res) => {
  const { guest_name, newGuestName } = req.body;
  if (namesCollection !== null) {
    const guest = await namesCollection.findOne({ guest_name });
    if (guest) {
      const result = await namesCollection.updateOne(
        { guest_name },
        { $set: { guest_name: newGuestName } }
      );
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: `Successfully updated ${guest_name}`, guest_name });
      } else {
        res.status(404).json({ message: `Guest ${guest_name} could not be updated` });
      }
    } else {
      res.status(404).json({ message: `Guest ${guest_name} not found` });
    }
  } else {
    res.status(500).json({ message: 'Database connection error' });
  }
});

// Middleware to check if the session is valid
function checkSession(req, res, next) {
  if (req.session && req.session.login) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Session expired or invalid' });
  }
}

// GET route to fetch all guest names
app.get('/getNames', checkSession, async (req, res) => {
  if (namesCollection !== null) {
    const names = await namesCollection.find().toArray();
    res.json(names);
  } else {
    res.status(500).json({ message: 'Database connection error' });
  }
});

// POST route to add a new guest name
app.post('/addName', checkSession, async (req, res) => {
  const { name } = req.body;
  if (namesCollection !== null) {
    const result = await namesCollection.insertOne({ guest_name: name, invited_by: req.session.username });
    if (result.insertedCount === 1) {
      res.status(200).json({ message: `Successfully added ${name}`, name });
    } else {
      res.status(404).json({ message: `Guest ${name} could not be added` });
    }
  } else {
    res.status(500).json({ message: 'Database connection error' });
  }
});

// DELETE route to delete a guest name
app.delete('/deleteName', checkSession, async (req, res) => {
  const { guest_name } = req.body;
  if (namesCollection !== null) {
    const guest = await namesCollection.findOne({ guest_name });
    if (guest.invited_by === req.session.username) {
      const result = await namesCollection.deleteOne({ guest_name });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: `Successfully deleted ${guest_name}`, guest_name });
      } else {
        res.status(404).json({ message: `Guest ${guest_name} could not be deleted` });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized to delete this guest' });
    }
  } else {
    res.status(500).json({ message: 'Database connection error' });
  }
});

// Start the Vite-Express server
ViteExpress.listen(app, 3000, () => {
  console.log("Server running on http://localhost:3000");
});
