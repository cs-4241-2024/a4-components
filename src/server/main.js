import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

let currentTotal = 0;
const todos = [
  { number:"Inserted Value", operation:'Inserted Operation', currentTotal:"Current Total (Begins at 0) " }
]

app.use( express.json() )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  let opera  = req.body.operation;  
  let num  = req.body.number;
    if (opera == "Add" || opera == "Sub"
      ||  opera == "Mult" || opera == "Div") {
      if (opera == "Add") {
        currentTotal = Number(num) + Number(currentTotal);
      }
      if (opera == "Sub") {
        currentTotal = Number(currentTotal) - Number(num);
      }
      if (opera == "Mult") {
        currentTotal = Number(num) * Number(currentTotal);
      }
      if (opera == "Div") {
        currentTotal = Number(currentTotal) / Number(num);
      }
      todos.push({ 'number': Number(num), 'operation': opera, 'currentTotal': Number(currentTotal) });
    }
  //todos.push( req.body )
  res.json( todos )
})

app.post( '/kill', ( req,res ) => {
  if(!((todos.length - 1) == 1))
  {
    todos.pop(todos.length - 1);
  }
  currentTotal = Number(todos[todos.length - 1].currentTotal);
  res.json( todos )
})



/*app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})*/

ViteExpress.listen( app, 3000 )