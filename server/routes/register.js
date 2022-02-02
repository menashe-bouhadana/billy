const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { registerValidation } = require("../controllers/validator.js");

router.post("/", registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password: plainTextPassword } = req.body;
  
  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      email,
      password,
    });
    res.status(201).json(response);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(500).json({ message: "Email already in use" });
    }
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
