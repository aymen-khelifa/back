const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const EmailSender =require ('../nodemailer');
 const nodemailer = require('nodemailer');
const User = require("../models/User");

const userController = {

register: async (req, res) => {
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomCode = "";
    for (let i = 0; i < 25; i++) {
      randomCode += characters[Math.floor(Math.random() * characters.length)];
    }
    const today = new Date();
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      activationCode:randomCode,
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
                //res.status(200).send({message:"User created successfully"}) 
                
                //EmailSender({email})
               // res.json({ msg: "Your message sent successfully" });
               var transport = nodemailer.createTransport({
                /*host: 'smtp.gmail.com',
                 port: 465,
                secure: true,*/
                service: 'Gmail',
                auth: {
                user: 'gytgutu@gmail.com',
                  pass: 'htypomzgmahmntfo',
                },
               });
               var mailOptions = {
               from: 'UVCT-Training',
               to: req.body.email,
                subject: 'activer votre compte',
                html: `
                 <div>
                  <h1>Email d'activation du compte </h1>
                    <h2>Bonjour </h2>
                  <p>Veuillez confirmer votre email en cliquant sur le lien suivant
                  <a href=http://localhost:3000/activationpage/${userData.activationCode}>Cliquez ici</a>                              
                   </div>`,
 
                    };
                  transport.sendMail(mailOptions, function (error, info) {
                    if (error) {
                       console.log(error);
                        } else {
                    console.log('Mail sent successfully:-', info.response);
                     }
                     });
              }) 
              .catch((err) => {
                res.send("error: " + err);
              });
              
           
          });
        } else {
          res.status(409).send({ message: "User already exist" });
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

getUser : async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['name','email','role'],
            where: {
                email: req.body.email
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
},

deleteUser : async(req, res) =>{
    const user = await User.findOne({
        where: {
            email:req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
},
forgetpass:async(req, res) =>{
  
   User.findOne({
      where: {
          email:req.body.email
      }
  })
  .then((user) => {console.log(user);
           var transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
            user: 'gytgutu@gmail.com',
              pass: 'htypomzgmahmntfo',
            },
           });
           var mailOptions = {
           from: 'UVCT-Training',
           to: req.body.email,
            subject: 'password oublie??',
            html: `
             <div>
              <h1>Email de verification  </h1>
                <h2>Bonjour </h2>
              <p>Veuillez confirmer votre email en cliquant sur le lien suivant
              <a href=http://localhost:3000/Formmdpoublie>Cliquez ici</a>                              
               </div>`,

                };
              transport.sendMail(mailOptions, function (error, info) {
                if (error) {
                   console.log(error);
                    } else {
                console.log('Mail sent successfully:-', info.response);
                 }
                 });
          }) 
          .catch((err) => {
            res.send("error: " + err);
          });
          
       
     
  },


resetpass:async(req,res)=>{
  const {password, confPassword, email} = req.body;
    let hashPassword;
    hashPassword = await bcrypt.hash(password);
    
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirmation Password does not match"});
    try {
        await User.update({
            
           password: hashPassword,
           
            where:{
                email: email
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
},

}


   


module.exports = userController