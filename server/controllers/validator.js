const { body } = require("express-validator");

const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];
const loginValidation = [body("email").isEmail()];
const changePasswordValidation = [body("newpassword").isLength({ min: 5 })];

module.exports = {
  registerValidation,
  loginValidation,
  changePasswordValidation,
};
