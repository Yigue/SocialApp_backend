const TABLA = "auth";
const auth = require("../../../auth");
const bcrypt = require("bcrypt");
const err = require("../../../utils/error");

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });
    return bcrypt.compare(password, data[0].password).then((sonIguales) => {
      if (sonIguales === true) {
        // Generar token;
        return auth.sing(data[0]);
      } else {
        throw err("Informacion invalida", 404);
      }
    });
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
 
    }

    return store.upsert(TABLA, authData);
  }

  return {
    upsert,
    login,
  };
};
