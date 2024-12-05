import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const gastoSchema = new mongoose.Schema({
    "userID": ObjectId,
    "categoria": String,
    "concepto": String,
    "monto": Number,
    "fecha": Date,
})

export const Gasto = mongoose.model("Gasto", gastoSchema)