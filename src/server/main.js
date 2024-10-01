import express from "express";
import ViteExpress from "vite-express";
import fs from 'fs';
import mime from 'mime';

const app = express();
const dir = 'public/';
const port = 3000;

let appdata = [
  ['Webware HW','4','1'], 
];

app.get('/api/table', (req, res) => {
  res.json({'table': appdata});
});

app.post('/api/saveTable', (req, res) => {
  let dataString = '';
  req.on('data', function(data) {
    dataString += data;
  });
  req.on('end', function() {
    console.log('a');
    console.log(dataString);
    appdata = JSON.parse(dataString).table;
    res.json({ message: 'Table data saved successfully' });
  });
});

app.post('*', (req, res) => {
  res.status(400).json({ message: 'Failure' });
});

const sendFile = function(res, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function(err, content) {
    if (err === null) {
      res.writeHead(200, { 'Content-Type': type });
      res.end(content);
    } else {
      res.status(404).send('404 Error: File Not Found');
    }
  });
};

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);