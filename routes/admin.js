const express = require("express");
const { getUsers, deleteUser } = require("../controllers/admin");
const { isAuth } = require("../middleware/isAuth");

const router = express.Router();

router.get("/users", [isAuth], getUsers);
router.delete("/user/:id", [isAuth], deleteUser);

module.exports = router;
