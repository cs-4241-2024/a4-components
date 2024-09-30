import express from "express";
import ViteExpress from "vite-express";

const app = express();

let appdata = [
  { name:'Piper', cookie:'chocolate chip', icecream:'vanilla', other:''}
]

app.use( express.static( 'dist' ) )
app.use( express.json() )


app.get( '/read', ( req, res ) => res.json( appdata ) )

app.post( '/add', ( req,res ) => {
  appdata.push( req.body )
  res.json( appdata )
})

app.post( '/change', function( req,res ) {
  const idx = appdata.findIndex( v => v.name === req.body.name )
  appdata[ idx ].completed = req.body.completed
  res.sendStatus( 200 )
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
