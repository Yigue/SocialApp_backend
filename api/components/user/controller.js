const { v4 } = require("uuid");
const auth = require("../auth");
const err = require("../../../utils/error");
const TABLA = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  function list() {
    return store.list(TABLA);
  }
  function get(id) {
    return store.get(TABLA, id);
  }
  function remove(id) {
    return store.remove(TABLA, id);
  }
  async function upsert(body) {
    const user = {
      username: body.username,
      name: body.name,
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = v4();
    }
    if (body.password || user.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }

    return store.upsert(TABLA, user);
  }
  async function follow(from, to) {
    return store.upsert(TABLA + "follow", {
      userFrom: from,
      userTo: to,
    });
  }
  async function followMe(user) {
    const join = {};
    join[TABLA] = "userTo";
    const query = { userFrom: user };
    return await store.query(TABLA + "follow", query, join);
  }
   async function followTo(user) {
   
     const join = {};
     join[TABLA] = "userTo";
     const query = { userFrom: user };
     return await store.query(TABLA + "follow", query, join);
   }
  
async function following(user) {
  const join = {};
  join[TABLA] = "userTo";
  const query = { userFrom: user };
  return await store.query(TABLA + "follow", query, join);
}
  return {
    list,
    upsert,
    get,
    remove,
    follow,
    followMe,
    followTo,
    following,
  };
};
