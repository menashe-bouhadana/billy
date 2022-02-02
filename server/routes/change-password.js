const express = require("express");
const dotenv = require("dotenv").config();
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { changePasswordValidation } = require("../controllers/validator.js");

router.post("/", changePasswordValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { token, newpassword: plainTextPassword } = req.body;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const _id = user._id;
    const password = await bcrypt.hash(plainTextPassword, 10);

    await User.updateOne(
      { _id },
      {
        $set: { password },
      }
    );
    res.status(200).json("Password Updated");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
