import express from 'express';
import path from 'path';
import cookieSession from 'cookie-session';
import { MongoClient } from 'mongodb';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { Octokit } from '@octokit/rest';
import session from 'express-session';
import axios from 'axios';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import ViteExpress from 'vite-express';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:;"
  );
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  })
);
app.use(session({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: true }));

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let collection = null;

async function connectToMongo() {
  try {
    await client.connect();
    collection = client.db('webware').collection('a3');
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error('Error connecting to MongoDB:', e);
  }
}

connectToMongo();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
}

app.get('/check-auth', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

function checkAuth(req, res, next) {
  if (!req.cookies.user || !req.session.user) {
    return res.status(401).send('Not authorized');
  }
  next();
}

app.get('/auth/git', (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = `${process.env.BASE_URL}/auth/git/callback`;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  res.redirect(githubAuthUrl);
});

app.get('/auth/git/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Code is missing');
  }

  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      return res.status(400).send('Failed to obtain access token');
    }

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const user = userResponse.data;
    req.session.user = user;
    res.cookie('user', user.login, { maxAge: 900000, httpOnly: true });
    res.redirect('/'); 
  } catch (error) {
    console.error('Error during GitHub OAuth:', error);
    res.status(500).send('Authentication failed');
  }
});

app.get('/posts', async (req, res) => {
  if (collection != null) {
    const posts = await collection
      .find({
        yourname: "atitcombe",
      })
      .toArray();
    res.json(posts);
  } else {
    res.status(500).send('Database not connected');
  }
});

app.post('/submit', async (req, res) => {
  const post = req.body;
  if (!post || !post.content) {
    return res.status(400).send('Post content is missing');
  }
  try {
    post.publication_date = new Date();
    post.wordCount = post.content.split(/\s+/).length;
    post.yourname = "atitcombe";

    const result = await collection.insertOne(post);
    console.log('New post inserted:', result);

    res.status(200).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/update', checkAuth, async (req, res) => {
  const post = req.body;
  if (!post || !post.content) {
    return res.status(400).send('Post content is missing');
  }
  try {
    post.publication_date = new Date();
    post.wordCount = post.content.split(/\s+/).length;
    post.yourname = req.session.user.login;

    const result = await collection.updateOne({ title: post.title }, { $set: post });
    console.log('Post updated:', result);

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/delete', checkAuth, async (req, res) => {
  const { title } = req.body;
  try {
    const result = await collection.deleteOne({ title, yourname: req.session.user.login });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
