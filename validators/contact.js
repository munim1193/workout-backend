const { body } = require("express-validator");
const errorHandler = require("./errorHandler");

const contactV = [
  body("name").not().isEmpty().trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("phone").not().isEmpty().trim().escape(),
  body("subject").not().isEmpty().trim().escape().isIn(["Všeobecná otázka", "Potrebujem pomoc", "K tvorbe"]),
  body("message").not().isEmpty().escape(),
  errorHandler,
];

const consultV = [
  body("name").not().isEmpty().trim(),
  body("telephone").not().isEmpty().trim().escape(),
  errorHandler,
];

module.exports = { contactV, consultV };
