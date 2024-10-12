import express from 'express';
import ViteExpress from 'vite-express';

const app = express();

let vehicles = [
  { model: 'Toyota', year: 1999, mpg: 23 },
  { model: 'Honda', year: 2004, mpg: 30 },
  { model: 'Ford', year: 1987, mpg: 14 },
];

app.use(express.json());

// Fetch all vehicles
app.get('/vehicles', (req, res) => {
  res.json(vehicles);
});

// Add a new vehicle
app.post('/vehicles', (req, res) => {
  vehicles.push(req.body);
  res.json(vehicles);
});

// Update a vehicle
app.put('/vehicles', (req, res) => {
  const { oldModel, model, year, mpg } = req.body;
  vehicles = vehicles.map((v) =>
    v.model === oldModel ? { model, year, mpg } : v
  );
  res.json(vehicles);
});

// Delete a vehicle
app.delete('/vehicles', (req, res) => {
  const { model } = req.body;
  vehicles = vehicles.filter((v) => v.model !== model);
  res.json(vehicles);
});

ViteExpress.listen(app, 3000);
