import express from 'express';
import ViteExpress from 'vite-express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.static('public'));
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}`;
const client = new MongoClient(uri);

let collection = null;

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    collection = client.db('a3-database').collection('To-do-list');

    // Routes

    // Route to get all tasks
    app.get('/docs', async (req, res) => {
      try {
        const docs = await collection.find({}).toArray();
        res.json(docs);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
      }
    });

    // Route to submit a new task
    app.post('/submit', async (req, res) => {
      try {
        const result = await collection.insertOne(req.body);
        const insertedTask = { ...req.body, _id: result.insertedId };
        res.json(insertedTask);
      } catch (err) {
        console.error('Error submitting task:', err);
        res.status(500).json({ error: 'Failed to submit task' });
      }
    });

    // Route to delete a task
    app.delete('/remove', async (req, res) => {
      try {
        const result = await collection.deleteOne({
          _id: new ObjectId(req.body._id),
        });

        res.json(result);
      } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Failed to delete task' });
      }
    });

    // Middleware to ensure MongoDB is connected
    app.use((req, res, next) => {
      if (collection !== null) {
        next();
      } else {
        res.status(503).send('Service Unavailable: Database not connected');
      }
    });

    // Start the server with ViteExpress
    ViteExpress.listen(app, 3000, () => {
      console.log('Server is running on port 3000');
    });

  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

// Execute the run function safely within an async IIFE
(async () => {
  await run().catch(err => {
    console.error("Error in run():", err);
  });
})();
