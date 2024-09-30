// Require Mongoose
import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;


const scoreSchema = new Schema({
    "name": String,
    "date": String,
    "points": String,
    "rank": Number
});
const Score = mongoose.model('Score', scoreSchema)

export default Score;