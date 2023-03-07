const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const EmailSender =require ('../nodemailer');
const userController = require('../Controllers/userController')
const User = require("../models/User");

router.post("/register", userController.register );

router.post("/login", userController.login);

router.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    where: {
      id: decoded.id,
    },
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = router;
