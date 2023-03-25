const express= require("express")
const bodyParser = require("body-parser");

const swaggerUI =require("swagger-ui-express")


const config= require("../config.js")
const user = require("./components/user/network.js");
const auth = require("./components/auth/network.js");

const errors=require("../network/errors.js")
 

const app=express() //inicializamos
app.use(bodyParser.json());

const swaggerDoc = require("./swagger.json")
// routing
app.use("/api/user",user)
app.use("/api/auth", auth);


app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDoc))

app.use(errors)


app.listen(config.api.port, ()=>{
    console.log("Api escuchando en el peurto", config.api.port);
})
