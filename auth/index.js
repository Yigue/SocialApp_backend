const jwt = require("jsonwebtoken");
const config = require("../config");
const err = require("../utils/error");
const secret = config.jwt.secret;

// Funciones Internas
function getToken(auth) {
  if (!auth) {
    throw err("No viene token", 404);
  }
  if (auth.indexOf("Bearer") === -1) {
    throw err("Formato Invalido", 404);
  }
  let token = auth.replace("Bearer ", "");
  return token;
}

function verify(token) {
  return jwt.verify(token, secret);
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";

  const token = getToken(authorization);

  const decoded = verify(token);
  req.user = decoded;


  return decoded;
}

// Funciones exportadas
function sing(data) {
  console.log(data);
  return jwt.sign(data, secret);
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    if (decoded.id !== owner) {
      throw err("No tienes permisos para hacer esto", 401);
    }
  },
  logged: function name(req) {
    const decoded = decodeHeader(req);

  },
};

module.exports = {
  sing,
  check,
};
