const express= require("express")
const bodyParser=require("body-parser")

const config= require("../config.js")
const router = require("./network")

const app=express()

app.use(bodyParser.json())
 
app.use("/",router)

app.listen(config.mysqlService.port,()=>{
    console.log("Servicio de mysql escuchando " ,config.mysqlService.port);
})