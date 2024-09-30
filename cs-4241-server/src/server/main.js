import express from 'express';
import ViteExpress from 'vite-express';

const PORT = process.env.PORT || 3000;
const app = express();
const appdata = [];

app.use( express.json() );

app.get( '/data', ( req,res ) => res.json( appdata ) );

app.post( '/submit', ( req,res ) => {
  const newData = req.body;

  const game = newData.game;
  const genre = newData.genre;
  const cost = newData.cost;
  const discount = newData.discount;
  let amountOff = (parseInt(discount) / 100) * parseInt(cost);
  if (isNaN(amountOff) || amountOff === null) {
    amountOff = 0;
  }

  appdata.push({
    game,
    genre,
    cost,
    discount,
    discountCost: cost - amountOff,
  });

  res.json(appdata);
})

app.delete( '/data', function( req,res ) {
  const index = req.body.index;

  appdata.splice(index, 1);
  
  res.json(appdata);
})

ViteExpress.listen(app, PORT);