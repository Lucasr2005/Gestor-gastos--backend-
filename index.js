import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoDbConnect } from "./mongoDbConnect.js";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import { Gasto } from "./models/gastos.js";
import { User } from "./models/user.js";
import passwordHash from "password-hash";
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
mongoDbConnect();
app.get("/api", (req, res) => {
    res.send("Hola")

})
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
    }).catch((error) => res.status(400).json({ error: error.message })
    )
})
app.get("/api/gastos/:id", (req, res) => {
    const userID = new ObjectId(req.params.id)

    Gasto.find({ "userID": userID }).then((response) => {
        res.send(response)
    })
        .catch((error) => res.status(400).json({ error: error.message })
        )
})
app.delete("/api/gastos/:id", (req, res) => {
    const userID = new ObjectId(req.params.id)
    Gasto.deleteMany({ "userID": userID }).then((response) => res.send(response)).catch((error) => res.status(400).json({ error: error.message })
    )
})

//user
app.get("/api/user", (req, res) => {
    const email = req.query.email
    const password = req.query.password
    if (!email || !password) {
        return res.status(400).json({
            error: "Faltan datos"
        })
    }
    User.findOne({ email: email }).then((response) => {
        if (response) {
            if (passwordHash.verify(password, response.password)) {
                return res.status(200).json({
                    _id: response._id
                })
            }
        }

        res.status(400).json({
            error: "Datos incorrectos"
        })


    }).catch((error) => {
        res.status(400).json({ error: error.message })

    })
})

app.post("/api/user", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
        return res.status(400).json({
            error: "Faltan datos"
        })
    }
    User.findOne({ email: email }).then((response) => {
        if (!response) {
            const user = new User({
                email: email,
                password: passwordHash.generate(password)

            })
            console.log(user)
            user.save().then((response) => {
                res.status(200).json({
                    _id: response._id
                })
            }).catch((error) => {
                res.status(400).json({ error: error.message.split(":")[0] })
            })
        }
        else {
            res.status(400).json({ error: "Correo ya registrado" })
        }
    })

})




const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})