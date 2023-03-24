const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const nodemailer = require('nodemailer');
const Apprenant = require("../models/Apprenant");

const apprenantController = {

addApprenant: async (req, res) => {
        const today = new Date();
        const userData = {
          name: req.body.name,
           tel:req.body.tel,
          email: req.body.email,
          password: req.body.password,
          created: today,
        };
        Apprenant.findOne({
          where: {
            email: req.body.email,
          },
        })
          //TODO bcrypt
          .then((user) => {
            if (!user) {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;
                Apprenant.create(userData).then(function (user) {
                    res.status(200).send({message:"apprenant created successfully"}) 
                    
        
                  })  
                  
              });
            } else {
              res.status(409).send({ message: "apprenant already exist" });
            }
          })
          .catch((err) => {
            res.send("error: " + err);
          });
},
getApprenant:async(req,res)=>{
    try {
        const response = await Apprenant.findAll({
            attributes:['uuid','name','tel', 'email', 'password','role'],
            where: {
                
              role:"apprenant",

          }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

},
deleteApprenant:async(req, res) =>{
    const apprenant = await Apprenant.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!apprenant) return res.status(404).json({msg: "apprennat not found"});
    try {
        await Apprenant.destroy({
            where:{
                email: req.body.email
            }
        });
        res.status(200).json({msg: "apprenant Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

}

   


module.exports = apprenantController