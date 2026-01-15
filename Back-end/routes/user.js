const express= require('express');
const router =express.Router();
const UserController = require('../controllers/UserController')
router.post('/send/otp/for/signup',(req,res)=>{
  UserController.sendOTPforSignup(req,res)
})
router.post('/auth/register',(req,res)=>{
  UserController.addUser(req,res)
})
router.post('/auth/login',(req,res)=>{
  UserController.userLogin(req,res)
})
module.exports=router;