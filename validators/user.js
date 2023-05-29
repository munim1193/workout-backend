const { body } = require("express-validator");
const errorHandler = require("./errorHandler");

const createV = [
  body("username")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Vyplňte prihlasovacie meno"),

  body("email").isEmail().withMessage("Vyplňte email"),
  body("fname")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Vyplňte celé meno"),
  body("telephone")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Vyplňte mobil"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Zadajte heslo, heslo musí mať aspoň 8 znakov"),
  errorHandler,
];

const loginV = [
  body("identity")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Zadajte prihlasovacie meno"),
  body("password").isLength({ min: 8 }).withMessage("Zadajte Heslo"),
  errorHandler,
];

const resendVerificatonV = [
  body("identity").not().isEmpty().trim(),
  errorHandler,
];

const changePasswordV = [
  body("password").not().isEmpty().trim(),
  errorHandler,
];

const verifyV = [ body("token").not().isEmpty().trim(), errorHandler ];

const toggleLike = [ body("designId").not().isEmpty().trim(), errorHandler ];

module.exports = {
  createV,
  loginV,
  resendVerificatonV,
  verifyV,
  changePasswordV,
  toggleLike
};
