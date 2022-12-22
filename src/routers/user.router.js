const { Router } = require("express");
const {
  getAll,
  postUser,
  getUserById,
} = require("../controllers/user.controller");

const router = Router();

router.route("/").get(getAll).post(postUser);
router.route("/:id").get(getUserById);

module.exports = router;
