const mysql = require("mysql2");
const config = require("../config.js");
const response = require("../network/response.js");
const err = require("../utils/error.js");

const dbconf = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((error) => {
    if (error) {
      console.error("[DB error]", error);
      setTimeout(handleCon, 2000);
    } else {
      console.log("DB Connected");
    }
  });

  connection.on("erroror", (error) => {
    console.erroror("[DB error]", error);
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw error;
    }
  });
}

handleCon();

function list(tabla) {
  return new Promise((resolve, reject) => {
    const query = `select * from ${tabla}`;
    console.log(query);
    connection.query(query, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}
function get(tabla, id) {
  return new Promise((resolve, reject) => {
    const query = `select * from ${tabla} where id='${id}'`;
    console.log(query);
    connection.query(query, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}
function list(tabla) {
  return new Promise((resolve, reject) => {
    const query = `select * from ${tabla}`;

    connection.query(query, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

function insert(tabla, data) {
  try {
    return new Promise((resolve, reject) => {
      connection.query(`insert into ${tabla} set ?`, data, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  } catch (error) {
    throw err("algo a salido mal", 500);
  }
}
function update(tabla, data) {
  return new Promise((resolve, reject) => {
    const query = ` update ${tabla} set ? where id=?`;
    console.log(query);
    connection.query(query, [data, data.id], (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}
function upsert(tabla, data) {
  if (data && data.id) {
    return update(tabla, data);
  } else {
    return insert(tabla, data);
  }
}

function query(table, query, join) {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      query,
      (err, res) => {
        if (err) return reject(err);
        resolve(res || null);
      }
    );
  });
}
module.exports = {
  list,
  get,
  upsert,
  query,
};
