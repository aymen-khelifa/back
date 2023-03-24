const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js')

module.exports = db.sequelize.define(
  'instructeurs',
  {
    UUid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    },
    name: {
      type: Sequelize.STRING,
   
      validate:{
        notEmpty:true ,
        len:[3,50]
      }
     
    
    
    },
    tel: {
      type: Sequelize.INTEGER,
      

    }, 
    
    email: {
      type: Sequelize.STRING,
      allowNull:false,
      isEmail:true,validate:{
        notEmpty:true,
        isEmail:true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull:false,
      
      validate:{
        notEmpty:true
      }

    },
   
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    message: {
      type: Sequelize.STRING,
   
      
    
  },isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: 1
    

  },role: {
    type: Sequelize.STRING,
    defaultValue:'instructeur',
    
  
},speciality: {
  type: Sequelize.STRING,
  allowNull:false,
      
      validate:{
        notEmpty:true
      }
  

},
 
    
  },
  {
    timestamps: false
  }
)