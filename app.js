var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const mysql=require("mysql");
var port = process.env.PORT || 5000
var SequelizeStore = require("connect-session-sequelize");
var session =require( "express-session");
var app = express()
const dotenv =require("dotenv").config();

app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:3000', "preflightContinue":true, "optionsSuccessStatus":200, credentials:true
}));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Access-control-request-methods,access-control-allow-origin');

  res.header("X-Requested-With", "XMLHttpRequest");

  // Set to true if you need the we
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
})

app.options("http://localhost:3000", cors())


//requte f postman

var router = require('./routes/Users')
var formateurcandidat=require('./routes/Formateur')


app.use('/users', router);
app.use('/formateurcandidat',formateurcandidat);




app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})

