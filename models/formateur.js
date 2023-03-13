const {Sequelize,DataTypes} = require('sequelize')
const db = require('../config/db.js')

module.exports = db.sequelize.define(
   'candformateurs',
  {
    UUid: {
      type: Sequelize.UUID,
      
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
    email: {
      type: Sequelize.STRING,primaryKey: true,
      allowNull:false,
      isEmail:true,
      validate:{
        notEmpty:true,
        
      }
    },
    tel: {
      type: Sequelize.INTEGER,
      allowNull:false,
      
      validate:{
        notEmpty:true
      }

    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    message:{
      type:Sequelize.STRING,

    }
    
  },
    
  
  {
    timestamps: false
  }
)