const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const EmailSender =require ('../nodemailer');
 const nodemailer = require('nodemailer');
const User = require("../models/User");
const Apprenant =require("../models/Apprenant")


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
                res.status(200).send({message:'user created successfully...check your inbox'}) 
                
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
    if (!email || !password) {console.log("aa")
      return res.send({
        message: "nom d'utilisateur ou bien mot de passe est manquante",
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
            });res.status(200).json({message:user});console.log(user)
            //res.send(token);
          if(User !== null) {console.log("aaa")
      req.session.user = {
            email: user.email,
            name: user.name,
      };console.log(email);} }else{res.send({ message: "mot de passe incorrect" });}
     } else  {
          res.status(400).json({ message: "User does not exist" });console.log("bbb")
        };
      }).catch((err) => {
        res.status(400).json({ message: err });console.log("bbb")
         
      });
  },

getUser : async(req, res) =>{
    try {
        const response = await Apprenant.findAll({
            attributes:['uuid','name','email','role','tel'],
            
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
  .then((user) => {
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
              <a href=http://localhost:3000/ResetPassword/${user.activationCode}>Cliquez ici</a>                              
               </div>`,

                };
              transport.sendMail(mailOptions, function (error, info) {
                if (error) {
                   console.log(error);response.send("error: ");
                    } else {
                console.log('Mail sent successfully:-', info.response);return res.status(200).send({message:"Mail sent successfully check your inbox"});
                 }
                 });
          }) 
          .catch((err) => {res.send({message:"user non trouve"});
          
          });
          
       
     
  },


  resetpass:async(req,res)=>{
    const {password, confpassword, email} = req.body;
      let hashPassword;
       hashPassword = await bcrypt.hash(password,10);
      
      if(password !== confpassword) return res.status(400).send({message: "Password and Confirmation Password does not match"});
      try {User.update({ password: hashPassword }, {
        where: {
          email: email
        }
      });
      return res.status(200).send({message: "mot de passe modifié"});
      } catch (error) {
        return res.status(400).send({message: "erreur"});
      }
  },
  
  
  
Userinfo: async (req, res) =>{
  if(!req.session.userId){
      return res.status(401).json({msg: "Veuillez vous connecter à votre compte !"});
  }
  
  const user = await User.findOne({
      attributes:['UUid','name','email','role'],
      where: {
          UUid: req.session.userId
      }
  });
  if(!user) return res.status(404).json({msg: "Utilisateur non trouvé"});
  res.status(200).json(user);
},
updateUser : async(req, res) =>{
  const user = await User.findOne({
      where: {
          email:req.body.email
      }
  });
  if(!user) return res.status(404).json({msg: "User not found"});
  const {name, email, tel} = req.body;

  try {
      await User.update({
          name: name,
          email: email,
        tel:tel,
        
      },{
          where:{
              email: user.email
          }
      });
      res.status(200).json({msg: "User Updated"});
  } catch (error) {
      res.status(400).json({msg: error.message});
  }
},
}


   


module.exports = userController