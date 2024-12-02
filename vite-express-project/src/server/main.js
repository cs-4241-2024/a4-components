import express from 'express';
import ViteExpress from 'vite-express';



// Your product data will be stored here
let products = [
  { product: "iPhone", releaseYear: 2007, releaseCost: 499, currentCost: 605 },
  { product: "Scrub Daddy", releaseYear: 2012, releaseCost: 1.99, currentCost: 3.49 }
];

// Helper function to calculate the current cost with inflation
function calculateCurrentCost(product) {
  let yearsOfInflation = 2024 - product.releaseYear;
  const inflationRate = 1.0328;  // Using the fixed inflation rate of 3.28%
  let newCost = product.releaseCost;
  
  while (yearsOfInflation > 0) {
    newCost *= inflationRate;
    yearsOfInflation--;
  }

  return newCost.toFixed(2); // Round the result to two decimal places
}

const app = express();
app.use(express.json()); // Enable JSON parsing

app.use(express.static('dist'))

// Endpoint to get the list of products
app.get('/products', (req, res) => {
  res.json(products);
});

// Endpoint to add a product
app.post('/products/add', (req, res) => {
  const product = req.body;
  product.currentCost = calculateCurrentCost(product); // Calculate the projected price
  products.push(product);  // Add the product to the list
  res.json(products); // Send the updated list back to the client
});

// Endpoint to delete a product
app.post('/products/delete', (req, res) => {
  const { product } = req.body;
  products = products.filter(p => p.product !== product); // Remove the product
  res.json(products); // Send the updated list back to the client
});

app.listen(3000)

// // Start the Vite-Express server
// ViteExpress.listen(app, 3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });
