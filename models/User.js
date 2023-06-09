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
    genre: {
      type: Sequelize.STRING,
      
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
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
      

    },
    role: {
      type: Sequelize.STRING,
      defaultValue:'user',
      
    
  },
  activationCode: {
    type: Sequelize.STRING,
    allowNull:true
  },

    
  },
  {
    timestamps: false
  }
)
