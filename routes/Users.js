const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Sequelize =require('sequelize')
const adminController = require('../Controllers/adminController')
const User = require("../models/User");
//const admin=require("../middleware/admin")
const userController = require('../Controllers/userController')

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
router.post('/getmail',userController.forgetpass);
router.patch("/update",userController.resetpass);

router.get("/activationpage/:activationCode", function(req, res) {
  const code=String(req.params.activationCode);console.log(code)
  User.findOne({
   activationCode : code
      
    
  }).then((user)=>{console.log(user)
    if (!user ) {console.log("bbb")
    return res.send({
      message: "le code d'activation semble étre faux !",
    });
   } else if (user && user.isVerified === true) {console.log("bbb")
        return res.send({
          message: "Votre compte est déja activé !",
        });
      } else if (user && user.isVerified === false){console.log("cc"),User.update({ isVerified: true }, {
        where: {
          isVerified: false
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
router.get("/getuser",userController.getUser);
module.exports = router;
