const express =require("express");
const formateurController=require("../Controllers/formateurController");
const router=express.Router();
router.get('/formateurs',formateurController.getFormateur);
router.post('/devenirinstructeur',formateurController.createFormateur);
module.exports = router;