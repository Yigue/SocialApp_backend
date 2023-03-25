const { v4 } = require("uuid");

const err = require("../../../utils/error");
const TABLA = "post";

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  function list() {
    return store.list(TABLA);
  }

  return {
    list,

  };
};
