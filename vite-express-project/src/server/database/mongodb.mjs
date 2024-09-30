import mongoose from "mongoose";
const dburl = process.env.connectionurl;
import {config} from "dotenv";
config()
let conn = null;
try {
    conn = await mongoose.connect(process.env.connectionurl);
    console.log(conn)
} catch (e) {
    console.log(e);
}
export default conn;