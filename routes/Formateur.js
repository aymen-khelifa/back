const express =require("express");
const admin=require("../middleware/admin");
const verifyUser=require("../middleware/verifyuser");

const formateurController=require("../Controllers/formateurController");
const router=express.Router();
router.get('/formateurs',formateurController.getFormateur,admin,verifyUser);
router.post('/devenirinstructeur',formateurController.createFormateur);
router.patch('/acceptInst',formateurController.acceptFormateur);




module.exports = router;