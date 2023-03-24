
// verification si l'user déja authentifiier 

const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Please login to your account!"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    req.userId = user.id;
    req.role = user.role; 
    next();
}
module.exports= verifyUser