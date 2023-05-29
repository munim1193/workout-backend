const express = require("express");
const {
  create,
  login,
  resendVerificaton,
  verify,
  resetPassword,
  changePassword,
} = require("../controllers/user");
const {
  createV,
  loginV,
  resendVerificatonV,
  verifyV,
  changePasswordV,
} = require("../validators/user");
const { isAuth } = require("../middleware/isAuth");

const router = express.Router();

router.post("/register", createV, create);
router.post("/login", loginV, login);
router.post("/resend-verification", resendVerificatonV, resendVerificaton);
router.post("/reset-password", resendVerificatonV, resetPassword);
router.post("/change-password", [isAuth, changePasswordV], changePassword);
router.post("/verify", verifyV, verify);

module.exports = router;
