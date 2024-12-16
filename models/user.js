import mongoose from "mongoose";
import Mongoose from "mongoose";

const user = new Mongoose.Schema({
    "email": { type: String, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, required: true, unique: true },
    "password": { type: String, required: true },

})

export const User = mongoose.model("User", user)