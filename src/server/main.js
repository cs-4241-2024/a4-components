import express from "express";
import ViteExpress from "vite-express";
import cookieSession from "cookie-session";
import mongodb from "mongodb"

const cookie = cookieSession,
      { MongoClient, ObjectId } = mongodb;
const app = express();

//const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.yjbwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
/*DELETE THIS LINE WHEN USING ON GLITCH!!!*/const uri = `mongodb+srv://smoliner:CS2024End@cluster0.yjbwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient( uri )

let collection = null

app.use(express.json())
app.use(express.urlencoded({extended: true }));

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

async function run() {
  await client.connect()
  collection = await client.db("datatest").collection("test")
  console.log("Connected to DB...");

  app.post("/login", async (req, res) => {
    let count = await collection.count({username: req.body.username, password: req.body.password}, {limit: 1})
    if( count ) {
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
      req.session.login = true
      req.session.username = req.body.username
      console.log( req.session ) 

    // since login was successful, send the user to the main content
    // use redirect to avoid authentication problems when refreshing
    // the page or using the back button, for details see:
    // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
      return res.json({ success: true, redirectUrl: "/home" });
    }else{
      let count2 = await collection.count({username: req.body.username}, {limit: 1})
      if(count2){
      // password incorrect, redirect back to login page
        return res.json({ success: true, redirectUrl: "/" });
      }else{
        let values = {username: req.body.username, password: req.body.password};
        await collection.insertOne(values)
        req.session.login = true
        return res.json({ success: true, redirectUrl: "/home" });
      }
    }
 })

 /*app.use( function( req,res,next) {
  if( req.session.login === true ){
    console.log("1")
    next()}
  else{
    console.log("2")
    return res.json({ success: true, redirectUrl: "/" });}
})*/

app.get("/docs", async (req, res) => {
  console.log("In docs")
  if (collection !== null) {
    const docs = await collection.find({id: req.session.username}).toArray()
    console.log("Docs" + docs)
    res.json( JSON.stringify(docs) )
  }
})

app.post( '/submit', async (request,response) => {
  //console.log(request.body)
  let score = request.body.score
  let rank = ''
  if(Number(score) < 1000) {
    rank = 'E'
  } else if(score < 5000) {
    rank = 'D'
  } else if(score < 10000) {
    rank = 'C'
  } else if(score < 20000) {
    rank = 'B'
  } else if(score < 30000) {
    rank = 'A'
  } else {
    rank = 'S'
  }
  //console.log( request.session )
  let _id = {id: request.session.username}
  //console.log(_id)
  let values = {id: request.session.username, yourname: request.body.yourname, game: request.body.game, score: request.body.score, rank: rank};
  let result = await collection.insertOne(values)
  const docs = await collection.find({id: request.session.username}).toArray()
  //console.log(JSON.stringify({"success":true, "result":result, "docs":docs}));
  response.json(docs)
})

app.post( '/delete', async (request,response) => {
  //console.log(request.body)
  //console.log( request.session )
  let _id = {id: request.session.username}
  //console.log(_id)
  let values = {id: request.session.username, yourname: request.body.yourname, game: request.body.game, score: request.body.score}
  const result = await collection.deleteOne(values)
  const docs = await collection.find({id: request.session.username}).toArray()
  response.json(docs)
})

app.post( '/modify', async (request,response) => {
  console.log(request.body)
  let score = request.body.score2
  let rank = ''
  if(Number(score) < 1000) {
    rank = 'E'
  } else if(score < 5000) {
    rank = 'D'
  } else if(score < 10000) {
    rank = 'C'
  } else if(score < 20000) {
    rank = 'B'
  } else if(score < 30000) {
    rank = 'A'
  } else {
    rank = 'S'
  }
  //console.log( request.session )
  let _id = {id: request.session.username}
  //console.log(_id)
  let values = {id: request.session.username, yourname: request.body.yourname1, game: request.body.game1, score: request.body.score1};
  const result = await collection.updateOne(values,
    { $set: {yourname: request.body.yourname2, game: request.body.game2, score: request.body.score2, rank: rank} }
  )
  const docs = await collection.find({id: request.session.username}).toArray()
  response.json(docs)
})
}

run().catch(console.dir);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
