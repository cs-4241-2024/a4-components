import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

let appdata = [ ];

app.use( express.json() )

app.get( '/read', ( req, res ) => res.json( appdata ) )

app.post( '/submit', ( req, res ) => {
  appdata.push( req.body )
  res.json( appdata )
})

app.delete( '/delete', ( req, res ) => {
  appdata = appdata.filter(data => data.index !== req.body.index)
  res.json( appdata )
})

app.put( '/save', function( req, res ) {

  const entry = req.body;

  const prevEntry = appdata.find(data => data.index === entry.index);

  if(prevEntry){
    prevEntry.workout = entry.workout;
    prevEntry.date = entry.date;
    prevEntry.stime = entry.stime;
    prevEntry.etime = entry.etime;
    prevEntry.time = entry.time;
  }

  // console.log(entry);

  // appdata.forEach(data => {
  //   if(data.index === entry.index){
  //     appdata[entry.index] = {
  //       index: entry.index,
  //       workout: entry.workout,
  //       date: entry.date,
  //       stime: entry.stime,
  //       etime: entry.etime,
  //       time: entry.time
  //     }
  //   }
  // })
  // appdata[ind] = req.body;
  res.json(appdata);
  
})

// ViteExpress.listen( app, 3000 )

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
