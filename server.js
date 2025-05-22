const express = require('express');
const path    = require('path');
const app     = express();
const port    = process.env.PORT || 5000;

const appdata = [
  { showName:'Breaking Bad',            directorName:'Vince Gilligan', comments:'An incredible journey of transformation and moral dilemmas.', rating:'5', status:'excellent' },
  { showName:'Law and Order: SVU',      directorName:'Dick Wolf',     comments:'A compelling procedural that tackles tough issues.',           rating:'4', status:'good' },
  { showName:'Avatar: The Last Airbender', directorName:'Michael Dante DiMartino', comments:'An excellent story but its ending was anticlimactic', rating:'2', status:'bad' }
];

app.use(express.json());

// API routes
app.get('/shows',   (req, res) => res.json(appdata));
app.post('/addShow', (req, res) => {
  appdata.push(req.body);
  res.json({ message:'Show added sucessfully', newShow: req.body });
});

app.post('/editShow', (req, res) => {
  const { showName, rating } = req.body;
  const show = appdata.find(s=>s.showName===showName);
  if (!show) return res.status(404).json({ message:'Not found' });
  show.rating = rating;
  show.status = ['1','2'].includes(rating)?'bad':'good';
  res.json({ message:'Show updated sucessfully', show });
});

app.post('/delShow', (req, res) => {
  const idx = appdata.findIndex(s=>s.showName===req.body.showName);
  if (idx===-1) return res.status(404).json({ message:'Not found' });
  appdata.splice(idx,1);
  res.json({ message:'Show deleted sucessfully' });
});

app.use(express.static(path.join(__dirname,'a4-ezrabarb-client','build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'a4-ezrabarb-client','build','index.html'));
});

// Start the server
app.listen(port, ()=> console.log(`Server listening on http://localhost:${port}`));
