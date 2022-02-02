const express = require("express");
const dotenv = require("dotenv").config();
const {initiateDatabase} = require('./database.js')

const app = express();
app.use(express.json());

// Db
initiateDatabase();

//  Routes
const registerRoute = require("./routes/register.js");
app.use("/api/register", registerRoute);

const loginRoute = require("./routes/login.js");
app.use("/api/login", loginRoute);

const changePasswordRoute = require("./routes/change-password.js");
app.use("/api/change-password", changePasswordRoute);


// Listner
app.listen(process.env.PORT || 4000, () =>
  console.log(`Server up in port ${process.env.PORT}`)
);
