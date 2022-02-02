const express = require("express");
const dotenv = require("dotenv").config();
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { loginValidation } = require("../controllers/validator.js");

router.post("/", loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.status(500).json("Invalid Email / Password");
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ data: token });
  }

  return res.status(500).json("Invalid Email / Password");
});

module.exports = router;
