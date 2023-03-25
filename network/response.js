exports.success = function (req, res, message, status) {

  let statusCode = status || 200;
  let statusMessage = message || "";


  res.status(status).send({
    error: false,
    status: status,
    body: message,
  });
};
exports.error = function (req, res, message, status) {

  let statusCode = status || 500;
  let statusMessage = message || "Ineternal server Error";

  res.status(status).send({
    error: false,
    status: status,
    body: message,
  });
};
