const { body } = require("express-validator");
const errorHandler = require("./errorHandler");

const updateProfileV = [
  body("username").not().isEmpty().trim().escape().isAlphanumeric(),
  body("email").isEmail().normalizeEmail(),
  body("fname").not().isEmpty().trim().escape(),
  body("lname").not().isEmpty().trim().escape(),
  body("gender").trim().escape().optional().isIn(["male", "female"]),
  body("telephone").trim().escape().optional(),
  errorHandler,
];

const updatePhotoV = [
  body("image").not().isEmpty().trim(),
  body("imageType").trim().isIn(["coverPicture", "profilePicture"]),
  errorHandler,
];

module.exports = { updateProfileV, updatePhotoV };
