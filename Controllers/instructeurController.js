const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const EmailSender =require ('../nodemailer');
 const nodemailer = require('nodemailer');
const Instructeur=require('../models/Instructeur');


const instructeurController = {
ajouterInstructeur: async (req, res) => {
        
        const today = new Date();
        const instructeurData = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          tel:req.body.tel,
          message:req.body.description,
          speciality:req.body.speciality,

          created: today,
        };
        Instructeur.findOne({
          where: {
            email: req.body.email,
          },
        })
          //TODO bcrypt
          .then((instructeur) => {
            if (!instructeur) {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                instructeurData .password = hash;
                Instructeur.create(instructeurData ).then(function (instructeur) {
               
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
                    subject: 'activer votre compte',
                    html: `
                     <div>
                     
                        <h2>Bonjour </h2>
                      <p>ravi d'étre avec nous 
                      <p>votre mot de passe est : ${instructeur.password}
                      <a href=http://localhost:3000/connexion>Cliquez ici</a>                              
                       </div>`,
     
                        };
                      transport.sendMail(mailOptions, function (error, info) {
                        if (error) {
                           console.log(error);
                            } else {
                        console.log('Mail sent successfully:-', info.response);res.send({message:'Mail sent successfully'})
                         }
                         });
                  }) 
                  .catch((err) => {
                    res.send("error: " + err);
                  });
                  
               
              });
            } else {
              res.status(409).send({ message:"instructeur déjà exist"});
            }
          })
          .catch((err) => {
            res.send("error: " + err);
          });
 },

getInstructeur: async (req, res) =>{
      try {
          let response;
              response = await Instructeur.findAll({
                  attributes:['uuid','name','email','tel','role'],
                  where: {
                
                    role:"instructeur",
    
                }
                  
              });
         
          res.status(200).json(response);
      } catch (error) {
          res.status(500).json({msg: error.message});
      }
 },
deleteInstructeur: async(req, res) =>{
 
    const instructeur = await Instructeur.findOne({
    where: {
        email:req.body.email,
        
                
          role:"instructeur",

     
    }
});
if(!instructeur) return res.status(404).json({msg: "formateur not found"});
if(req.role === 4){
try {
    await Instructeur.destroy({
        where:{
            id: user.id
        }
    });
    res.status(200).json({msg: "Instructeur Deleted"});
} catch (error) {
    res.status(400).json({msg: error.message});
}}
else {

res.status(400).json({msg:"vous n'avez pas l'accés"});

}},



}
module.exports = instructeurController