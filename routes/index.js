const express = require("express");
const userRouter = require("./user");
const adminRouter = require("./admin");
const profileRouter = require("./profile");

const router = express.Router();

router.use(userRouter);
router.use("/profile", profileRouter);
router.use("/admin", adminRouter);

module.exports = router;
