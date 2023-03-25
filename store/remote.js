const request = require("request");

function createRemoteDB(host, port) {
  const URL = "http://" + host + ":" + port;
  function list(tabla) {
    return req("GET", tabla);
  }
  //   function get(tabla,id) {}
  //   function upsert(tabla,data) {}
  //   function query(tabla,query,join) {}

  function req(method, tabla, data) {
    let url = URL + "/" + tabla;
    
    body:"";

    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          url,
          body : "",
        },
        (err, req, body) => {
          if (err) {
            console.error("error con la base de datos remota", err);
            return reject(err.message);
          }

          const resp = JSON.parse(body);
          return resolve(resp.body);
        }
      );
    });
  }

  return{
    list,
  }
}
module.exports= createRemoteDB