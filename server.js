import express from 'express';
import ViteExpress from 'vite-express';

const app = express();
app.use(express.json());

let appdata = [
  { product: "iPhone", releaseYear: 2007, releaseCost: 499, currentCost: 605 },
  { product: "Scrub Daddy", releaseYear: 2012, releaseCost: 1.99, currentCost: 3.49 }
];

function calculateCurrentCost(product) {
  let yearsOfInflation = 2024 - product.releaseYear;
  let inflationRate = 1.0328;
  let newCost = product.releaseCost;
  while (yearsOfInflation > 0) {
    newCost *= inflationRate;
    yearsOfInflation--;
  }
  product.currentCost = newCost.toFixed(2);
}

app.get('/products', (req, res) => {
  res.json(appdata);
});

app.post('/add', (req, res) => {
  const newProduct = req.body;
  calculateCurrentCost(newProduct);
  appdata.push(newProduct);
  res.json(appdata);
});

app.post('/delete', (req, res) => {
  const { product } = req.body;
  appdata = appdata.filter(item => item.product !== product);
  res.json(appdata);
});

ViteExpress.listen(app, 3000, () => console.log('Server listening on port 3000'));
