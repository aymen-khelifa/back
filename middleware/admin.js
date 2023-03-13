const User=require("../models/User");

const  admin= async (req, res, next) =>{
    if(req.User.role!=4){
        return res.status(401).json({err:'acces refuseé'});
      
    }
  next();
}
module.exports=admin