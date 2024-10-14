import express from  'express'
import ViteExpress from 'vite-express'

const app = express()
let numId = 1;
let todos = [
  { name:'buy groceries', price: '3', quantity: '2', tcost:6,  completed:false, id: 0 }
]

app.use(express.json())

app.get('/read', (req, res) => res.json(todos))

app.post('/add', (req,res) => {
  req.body.id = numId;
  numId++;
  todos.push(req.body)
  res.json(todos)
})

app.post('')

app.put('/change*', function(req,res) {
  const idx = todos.findIndex(v => v.id === req.body.id);
  console.log("req name: ", req.body.name);
  console.log("id: ", idx);

  todos[idx].name = req.body.name;
  todos[idx].price = req.body.price;
  todos[idx].quantity = req.body.quantity;
  todos[idx].tcost = req.body.quantity * req.body.price;
  todos[idx].completed = req.body.completed;
  
  res.json(todos);
})

app.delete('/delete*', function(req,res) { // function for handling DELETE request
  const id = parseInt(req.url.split("/")[2], 10); // splits url to get path
  console.log(`Deleting entry with ID: ${id}`);

  todos = todos.filter((entry) => entry.id !== id);
  res.writeHead(200, "OK", { "Content-Type": "application/json" });
  res.end(JSON.stringify(todos));
});


ViteExpress.listen(app, 3000)