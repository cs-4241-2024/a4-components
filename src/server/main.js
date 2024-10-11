import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

const appdata = [
  { name:'buy groceries', price: '3', quantity: '2', completed:false }
]

app.use(express.json())

app.get('/read', (req, res) => res.json(appdata))

app.post('/add', (req,res) => {
  appdata.push(req.body)
  res.json(appdata)
})

app.post('/change', function(req,res) {
  const idx = appdata.findIndex(v => v.name === req.body.name);
  appdata[idx].price = req.body.price;
  appdata[idx].quantity = req.body.quantity;
  appdata[idx].tcost = req.body.quantity * req.body.price;
  appdata[idx].completed = req.body.completed;
  
  res.sendStatus(200)
})

app.delete('/delete', function(req,res) { // function for handling DELETE request
  const id = parseInt(req.url.split("/")[2], 10); // splits url to get path
  console.log(`Deleting entry with ID: ${id}`);

  appdata = appdata.filter((entry) => entry.id !== id);
  res.writeHead(200, "OK", { "Content-Type": "application/json" });
  res.end(JSON.stringify(appdata));
});

app.put('/edit*', function(req, res) { // function for handling PUT request
  const id = parseInt(req.url.split("/")[2], 10);
  const updatedEntry = res.json();
  //let dataString = "";

  // req.on("data", function(data) {
  //   dataString += data;
  // });
  
  //request.on("end", function() { // update table info
  //updatedEntry = JSON.parse(dataString); // parse new received datastring
    const entryIndex = appdata.findIndex((entry) => entry.id === id);
    updatedEntry.total = updatedEntry.price * updatedEntry.quantity; // calculate total cost
    
    appdata[entryIndex] = {id, ...updatedEntry}; // update the table entry
    console.log("Updated entry:", appdata[entryIndex]);
    response.writeHead(200, "OK", {"Content-Type": "application/json"});
    response.end(JSON.stringify(appdata));
});


ViteExpress.listen(app, 3000)