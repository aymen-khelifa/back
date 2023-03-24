const User=require("../models/User");

const  admin= async (req, res, next) =>{
  const user = await User.findOne({
    where: {
        uuid: req.session.userId
    }
});
if(!user) return res.status(404).json({msg: "Utilisateur non trouvé"});
if(user.role !== "admin") return res.status(403).json({msg: "Accées refusé"});
next();
}
   

module.exports=admin