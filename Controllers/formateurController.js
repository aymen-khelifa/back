const { INTEGER } = require('sequelize');
const Formateur=require('../models/formateur');

const FormateurController = {
createFormateur : async(req, res) =>{
 
    const today = new Date();
    const userData = {
      name: req.body.name,
      email: req.body.email,
      tel: req.body.tel,
      message:req.body.message,
      speciality:req.body.speciality,
      created: today,
      
    };
    Formateur.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
        if (!user) {
          
            Formateur.create(userData).then(function (user) {
                res.status(200).send({message:"votre demande est bien envoyé"}) 
                //const email=req.body.email;
                //EmailSender({email})
                //res.json({ msg: "Your message sent successfully" });
              })  //.then (
               // const email=req.body.email;
                //EmailSender({email})
                // console.log("aa")
                // res.json({ msg: "Your message sent successfully" });)
              .catch((err) => {
                res.send("error: " + err);
              });
              
           
          
        } else {
          res.status(409).send({ message:"demande deja envoyée"});
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
      
        /*try {
            await Formateur.create({
                name: name,
                email: email,
                tel: tel,
                message:message
            });
            res.status(200).json({msg: "votre demande est bien envoyé "});
            alert("votre demande est bien envoyé")
        } catch (error) {if(res.status===400){
            res.status(400).json({msg: error.message});
        alert(error)}
            if(res.status===409){
                res.status(400).json({msg: "already exist"});
                alert("already exist")
            }
           
        }*/
    },
    getFormateur : async(req, res) =>{
        try {
            const response = await Formateur.findAll({
                attributes:['uuid','name','email','tel','message','speciality','role'],
                where: {
                
                  role:"candidat",
  
              }
                
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
acceptFormateur: async(req, res) =>{

  const code=INTEGER(req.params.uuid);console.log(code)
  Formateur.findOne({
   uuid : code,
   where: {
    isVerified: false,
    role:'candidat'
  }
      
    
  }).then((user)=>{console.log(user),console.log("aaa")
   
   
        if (user && user.role === 'candidat')
       {Formateur.update({ isVerified: true,role:'instructeur' }, {
        where: {
          isVerified: false,
          role:'candidat'
        }
      });
          return res.send({
            message: "candidat Accepté avec Success !",
          
        });
      }else {console.log('aa');return res.send({
        message: " acceptation echouée",
      
    });}
    })
   
;}






}
module.exports = FormateurController