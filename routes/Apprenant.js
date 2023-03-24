const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Sequelize =require('sequelize')
//const ad = require('../Controllers/adminController')
const Apprenant= require("../models/Apprenant");
const verifyUser=require("../middleware/verifyUser");
const admin = require ("../middleware/admin");
const apprenantController = require('../Controllers/apprenantController')


router.post("/add",apprenantController.addApprenant,admin);
router.get("/voirtous",apprenantController.getApprenant,verifyUser,admin)
router.delete("/deleteapp",apprenantController.deleteApprenant
,admin)

module.exports = router;