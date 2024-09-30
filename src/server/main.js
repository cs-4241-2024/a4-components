import express from "express";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";

import { createServer as createViteServer } from 'vite'
import fs from 'fs'

var app = express()
const port = 3000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json({extended:true}))

const appdata = [
  { name: "Kay", score: 132, date: (new Date("July 6, 2023 1:23:45 AM")).toDateString() },
  { name: "Taylor", score: 42, date: (new Date("September 8, 2024 2:30:00 PM")).toDateString() },
  { name: "test", score: 1, date: (new Date()).toDateString()},
];

const sendFileOptions = {root:"src/client"}

// Sort and then send the current table
const sortAndSend = function (req, res) {
  appdata.sort(function (a, b) {
    return b.score - a.score;
  });
  res.writeHead(200, "OK", { "Content-Type": "text/plain" });
  res.end(JSON.stringify(appdata));
};

app.get('/', async (req, res, next) => {
  try {
    res.redirect("index.html")
  } catch (e) {
    return next(e)
  }
})

app.get('/data', (req, res) => {
  res.send(JSON.stringify(appdata));
})

app.post("/submit", (req, res) => {
  console.log(req.body);
  const data = req.body;
  let updated = false;
  for (var i = 0; i < appdata.length; i++) {
    if (data.name === appdata[i].name) {
      appdata[i].score = data.score;
      updated = true;
    }
  }
  if (!updated) {
    console.log("name " + data.name);
    appdata.push({ name: data.name, score: data.score, date: (new Date()).toDateString() });
  }
  sortAndSend(req, res);
});

app.post("/delete", (req, res) => {
  const data = req.body;
  console.log("Received delete request for " + req.body);
  let idx = undefined;
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].name === data.name) {
      console.log("Deleting.");
      appdata.splice(i, 1);
      break;
    }
  }
  sortAndSend(req, res);
});


ViteExpress.listen(app, port, () => {
  console.log(`Example app listening on port ${port}`)
});

const vite = await createViteServer
({
  server : { middlewareMode : true },
  appType : 'custom'
})
app.use(vite.middlewares);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});
