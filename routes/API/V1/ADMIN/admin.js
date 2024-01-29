const express = require('express')
const routes = express.Router();
const AdminController = require('../../../../Controller/API/V1/ADMIN/adminController');
const passport =require("passport");

routes.post("/register" , AdminController.register)
routes.post("/login", AdminController.login);
routes.get("/adminprofile",passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),AdminController.adminprofile);
routes.get("/faillogin",async(req,res)=>{
    return res.status(400).json({ mes: 'login failed', status: 0 });
})
routes.post("/addtask",passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),AdminController.addtask)
//user data view in admin 
routes.get("/getallUser",passport.authenticate('jwt',{failureRedirect:"/admin/Userfaillogin"}),AdminController.getallUser);
routes.get("/Userfaillogin",async(req,res)=>{
    return res.status(400).json({ mes: 'User data is not found', status: 0 });
})
routes.use("/User",require("../User/User"));
module.exports = routes;