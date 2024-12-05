import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import { Gasto } from "./models/gastos.js";
export function mongoDbConnect() {
    mongoose.set("strictQuery", false)
    console.log("Conecting...")
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to mongoDb")

    })

        .catch((err) => console.log(err))
}