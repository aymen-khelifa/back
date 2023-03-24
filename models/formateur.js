const {Sequelize,DataTypes} = require('sequelize')
const db = require('../config/db.js')

module.exports = db.sequelize.define(
   'instructeurs',
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
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
      

    },
    message:{
      type:Sequelize.STRING,

    },
    role: {
      type: Sequelize.STRING,
      defaultValue:'candidat',
      
    
  },speciality: {
    type: Sequelize.STRING,
  
    
  
  },
    
  },
    
  
  {
    timestamps: false
  }
)