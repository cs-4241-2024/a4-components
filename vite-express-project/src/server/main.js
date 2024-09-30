import express from  'express'
import ViteExpress from 'vite-express'
import userrouter from "./routes/userapi.mjs";
import scorerouter from "./routes/scoreapi.mjs";
import {config} from "dotenv";

const app = express()

config()
console.log("db url " + process.env.connectionurl)

app.use( express.json())
app.use("/user", userrouter)
app.use("/score", scorerouter)

ViteExpress.listen( app, 3000 )
