const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const EmailSender =require ('../nodemailer');

const User = require("../models/User");

const userController = {

register: async (req, res) => {
    const today = new Date();
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      created: today,
    };
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      //TODO bcrypt
      .then((user) => {
        if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash;
            User.create(userData).then(function (user) {
                res.status(200).json({status: user.email + "   " + "User created successfully"}) 
                //const email=req.body.email;
                //EmailSender({email})
                //res.json({ msg: "Your message sent successfully" });
              })  //.then (
               // const email=req.body.email;
                //EmailSender({email})
                // console.log("aa")
                // res.json({ msg: "Your message sent successfully" });)
              .catch((err) => {
                res.send("error: " + err);
              });
              
           
          });
        } else {
          res.status(409).json({ error: "User already exists" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  },
login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        error: "nom d'utilisateur ou bien mot de passe est manquante",
      });
    }
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440,
            });res.status(200).json({status:user.email+"logged successfully"})
            //res.send(token);
          }
        } else {
          res.status(400).json({ error: "User does not exist" });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  },


 
  
   /* const email=req.body.email;
                EmailSender({email})
                     console.log("aa")
               res.json({ msg: "Your message sent successfully" });   */   
  }


module.exports = userController