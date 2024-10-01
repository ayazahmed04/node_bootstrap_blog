const express = require("express");
const authController = require("../controller/auth");
const Router = express.Router();

Router.post("/register", authController.register);

module.exports = Router;
