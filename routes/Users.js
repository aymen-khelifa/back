const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Sequelize =require('sequelize')
const adminController = require('../Controllers/adminController')
const userController = require('../Controllers/userController')
const apprenantController = require('../Controllers/apprenantController')

const User = require("../models/User");
const admin=require("../middleware/admin");
const verifyUser=require("../middleware/verifyuser");


//requete f postman
router.post("/registeradmin", adminController.registeradmin );

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
router.post('/getmail',userController.forgetpass);//,verifyUser
router.patch("/update",userController.resetpass);//,verifyUser

router.get("/activationpage/:activationCode", function(req, res) {
  const code=String(req.params.activationCode);console.log(code)
  User.findOne({
   activationCode : code
      
    
  }).then((user)=>{console.log(user)
    if (!user ) {
    return res.send({
      message: "le code d'activation semble étre faux !",
    });
   } else if (user && user.isVerified === true) {
        return res.send({
          message: "Votre compte est déja activé !",
        });
      } else if (user && user.isVerified === false){User.update({ isVerified: true,role:'apprenant' }, {
        where: {
          isVerified: false,
          role:'user'

        }
      });
          return res.send({
            message: " Votre compte est activé avec succées !",
          
        });
      }else {return res.send({
        message: " verification echouée",
      
    });}
    })
   
;});
router.get("/getuser",userController.getUser);//,admin,verifyUser
router.get("/userinfo",userController.Userinfo);
router.patch("/updateinfo",userController.updateUser)
router.delete('/supprimer',userController.deleteUser)
router.delete('/supprimerAdmin',adminController.deleteadmin);
router.get('/getAdmin',adminController.getAdmin);

router.post("/add",apprenantController.addApprenant);//,admin
router.get("/getapprenant",apprenantController.getApprenant)//,verifyUser,admin
router.delete("/deleteapp",apprenantController.deleteApprenant)//,admin
module.exports = router;
