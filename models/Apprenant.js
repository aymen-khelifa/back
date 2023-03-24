const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/db.js')

module.exports = db.sequelize.define(
  'users',
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
      allowNull:false,
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
        
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull:false,
      
      validate:{
        notEmpty:true
      }

    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
      

    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    role: {
      type: Sequelize.INTEGER,
      defaultValue:"apprenant",
     }  
    
 

    
  },
  {
    timestamps: false
  }
)