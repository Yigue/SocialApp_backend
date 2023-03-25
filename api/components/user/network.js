const express = require("express");

const Secure = require("./secure");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.get("/", get);
router.get("/:id", getID);
router.post("/", upsert);
router.put("/", Secure("update"), upsert);
router.delete("/:id", remove);

router.post("/follow/:id", Secure("follow"), follow);

router.get("/:id/following", following);

// router.get("/followers", Secure("follow"), followers);
// router.get("/followers/:id", Secure("follow"), followers);

function get(req, res, next) {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next);
}
function getID(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}
function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then(() => {
      response.success(req, res, req.body, 200);
    })
    .catch(next);
}
function remove(req, res, next) {
  Controller.remove(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}
function follow(req, res, next) {
  Controller.follow(req.user.id, req.params.id)
    .then((data) => {

      response.success(req, res, data, 201);
    })
    .catch(next);
}
// function followers(req, res, next) {
//   if (req.params.id) {
//     Controller.followTo(req.user.id, req.params.id)
//       .then((data) => {

//         response.success(req, res, data, 201);
//       })
//       .catch(next);
//   } else {
//     console.log("asdas");
//     Controller.followMe(req.user.id)
//       .then((data) => {

//         response.success(req, res, data, 201);
//       })
//       .catch(next);
//   }
// }
function following(req, res, next) {
  return Controller.following(req.params.id)
    .then((data) => {
      return response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;
