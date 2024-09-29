// Require Mongoose
import mongoose from "mongoose";
// Define a schema
const Schema = mongoose.Schema;


const userSchema = new Schema({
    "shortname": String,
    "username": String,
    "password": String,
});
const User = mongoose.model('User', userSchema)

export default User;