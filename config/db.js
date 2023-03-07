const Sequelize = require('sequelize')
const mysql=require("mysql");

const db = {}

const sequelize = new Sequelize('stage', 'root','', {
  host: 'localhost',
  dialect: 'mysql',
  port:3307,
  
})
try {   sequelize.authenticate();   
        console.log('Connecté à la base de données MySQL!'); 
    } catch (error) { 
        console.error('Impossible de se connecter, erreur suivante :', error);
     }

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db