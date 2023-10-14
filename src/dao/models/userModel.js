import mongoose from "mongoose";

const usersCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age:Number,
    password: String,
    rol: String
})

const userModel = mongoose.model(usersCollection, userSchema)

export default userModel