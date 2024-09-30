import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

const todos = []

app.use( express.json() )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  let name = req.body.name;
  let date = req.body.date;
  let sold = req.body.sold;
  let capacity = req.body.capacity;
  let status = 'Filling';
  if (sold >= capacity) {
    status = 'Sold Out'
  }
  todos.push({ 'name': name, 'date': date, 'sold': Number(sold), 'capacity': Number(capacity), 'status': status });
  res.json( todos )
})

ViteExpress.listen( app, 3000 )