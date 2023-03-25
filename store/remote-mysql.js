const remote=require("./remote")
const config= require("../config.js")

module.exports = new remote(config.mysqlService.host, config.mysqlService.port);