import express from "express";
import ViteExpress from "vite-express";

const app = express();

const appdata = [
  { name: "Lisa", score: 1000, rank: 1 },
  { name: "John", score: 100, rank: 2 },
  { name: "Jacob", score: 5, rank: 3 },
];

// Sort and then send the current table
const sortAndSend = function (request, response) {
  appdata.sort(function (a, b) {
    return b.score - a.score;
  });

  for (var i = 0; i < appdata.length; i++) {
    appdata[i].rank = i + 1;
  }

  response.json(appdata);
};

app.post('/submit', express.json(), (request, response) => {
  const data = request.body;
  let updated = false;
  for (var i = 0; i < appdata.length; i++) {
    if (data.name === appdata[i].name) {
      appdata[i].score = data.score;
      updated = true;
    }
  }
  if (!updated) {
    console.log("name " + data.name);
    appdata.push({ name: data.name, score: data.score, rank: 0 });
  }

  sortAndSend(request, response);
})

app.post('/delete', express.json(), (request, response) => {
  const data = request.body;
  console.log("Received delete request for " + data.name);
  let idx = undefined;
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].name === data.name) {
      idx = i;
    }
  }
  if (idx != undefined) {
    console.log("Deleting.");
    appdata.splice(idx, 1);
  }
  sortAndSend(request, response);
})

app.get('/data', (request, response) => {
  response.json(appdata);
})



app.use(express.static("../client"));


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
