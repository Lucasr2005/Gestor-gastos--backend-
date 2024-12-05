import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoDbConnect } from "./mongoDbConnect.js";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import { Gasto } from "./models/gastos.js";

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
mongoDbConnect();

app.post("/api/gastos", (req, res) => {
    // const IdPedido = new ObjectId(id);
    const gasto = new Gasto({
        "userID": new ObjectId(req.body.userID),
        "categoria": req.body.categoria,
        "concepto": req.body.concepto ? req.body.concepto : "",
        "monto": req.body.monto,
        "fecha": req.body.fecha ? new Date(req.body.fecha) : new Date(),
    })

    if (!gasto.userID || !gasto.categoria || !gasto.monto) {
        return res.status(400).json({ error: "Faltan datos" })
    }
    gasto.save().then((response) => {
        res.send({ response })
    }).catch((error) => res.status(400).json({ error }))
})
app.get("/api/gastos/:id", (req, res) => {
    const userID = new ObjectId(req.params.id)
    console.log(userID)
    Gasto.find({ "userID": userID }).then((response) => res.send(response)).catch((error) => res.status(400).json({ error }))
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})