const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const EmailSender =require ('../nodemailer');
 //const nodemailer = require('nodemailer');
const Admin = require("../models/Admin");

const adminController = { 


registeradmin: async (req, res) => {
        const today = new Date();
        const userData = {
          name: req.body.name,
          genre:req.body.genre, 
          email: req.body.email,
          password: req.body.password,
          tel:req.body.tel,
          created: today,
        };
        Admin.findOne({
          where: {
            email: req.body.email,
          },
        })
          //TODO bcrypt
          .then((user) => {
            if (!user) {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;
                Admin.create(userData).then(function (user) {
                    res.status(200).send({message:"admin created successfully"}) 
                    
        
                  })  
                  .catch((err) => {
                    res.send("error: " + err);
                  });
                  
               
              });
            } else {
              res.status(409).send({ message: "admin already exist" });
            }
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      },
getAdmin: async(req, res) =>{
        try {
            const response = await Admin.findAll({
                attributes:['nom','prenom','genre','tel', 'email', 'password']
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
deleteadmin :async(req, res) =>{
        const admin = await Admin.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!admin) return res.status(404).json({msg: "admin not found"});
        try {
            await Admin.destroy({
                where:{
                    id: admin.id
                }
            });
            res.status(200).json({msg: "admin Deleted"});
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
    }


 }


module.exports = adminController