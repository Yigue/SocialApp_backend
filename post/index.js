const express = require("express");
const bodyParser = require("body-parser");


const config = require("../config.js");
const post = require("./components/post/network.js");
const errors = require("../network/errors.js");


const app = express(); //inicializamos
app.use(bodyParser.json());


// routing
app.use("/api/post", post);

app.use(errors);

app.listen(config.post.port, () => {
  console.log("Api escuchando en el peurto", config.post.port);
});
