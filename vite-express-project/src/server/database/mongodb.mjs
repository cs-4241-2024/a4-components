import mongoose from "mongoose";
const dburl = process.env.connectionurl;
import {config} from "dotenv";

config({path : "C:\\Users\\sophi\\WebstormProjects\\a4-sophia-woodward\\vite-express-project\\.env"});
console.log("db url " + process.env.connectionurl)
let conn = null;
try {
    conn = await mongoose.connect(process.env.connectionurl);
    console.log(conn)
} catch (e) {
    console.log(e);
}
export default conn;