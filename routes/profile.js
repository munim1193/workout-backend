const express = require("express");
const { isAuth } = require("../middleware/isAuth");
const { getProfile } = require("../controllers/profile");

const router = express.Router();

router.get("/", isAuth, getProfile);

module.exports = router;
