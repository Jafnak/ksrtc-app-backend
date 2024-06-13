const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const { busmodel } = require("./models/register")

const app = express()
app.use(express.json())
app.use(cors())

app.post("/login",(req,res)=>{
    let input = req.body
    let bus = busmodel(input)
    bus.save()
    console.log(bus)
    res.json({"status":"success"})
})

app.listen(8080,(req,res)=>{
    console.log("server started")
})
