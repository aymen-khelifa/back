const instructeur= require("../Controllers/instructeurController");
const express = require("express");



const router = express.Router();
const formateurController=require("../Controllers/formateurController");



router.get('/formateurs',formateurController.getFormateur);//,admin,verifyUser
router.post('/devenirinstructeur',formateurController.createFormateur);
router.get('/acceptinst/:id',formateurController.acceptFormateur);


router.post("/ajouterinstr",instructeur.ajouterInstructeur,);
router.get("/getinstr", instructeur.getInstructeur);
router.delete("/supprimerinstr",instructeur.deleteInstructeur);
module.exports = router;