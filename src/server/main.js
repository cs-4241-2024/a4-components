import express from "express";
import ViteExpress from "vite-express";
import cookieSession from "cookie-session";

const cookie = cookieSession(),
      app = express();

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);

app.use(express.static('views') )
app.use(express.static('public') )
app.use(express.json())
app.use(express.urlencoded({extended: true }));

app.keys = ['key1', 'key2'];

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

//const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.yjbwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
//const client = new MongoClient( uri )

let collection = null