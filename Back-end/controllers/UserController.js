const User = require('../models/User')
const bcrypt = require('bcrypt')
const nodemailer =require('nodemailer')
const jwt = require('jsonwebtoken')
async function addUser(req,res){
    try{
        let existUser = await User.findOne({ email: req.body.email })
        if (existUser) {
            res.status(409).send({ success: false, message: "User already exist!" })

        } else {
        let user = new User(req.body)
        let encryptedPassword=bcrypt.hashSync(req.body.password,10)
        user.password=encryptedPassword;
         await user.save();
         let msg="Dear" +req.body.firstName+",your account has been created on our platform."
         let transporter=nodemailer.createTransport({
            service:'gmail',
          auth:{
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
         })  
         let mailOptions={
            from:process.env.EMAIL_USER,
            to:req.body.email,
            subject:'Regarding ur Account Creation on Task Manager',
            text:msg
         };
         transporter.sendMail(mailOptions,(err)=>{
            if(err){
                console.log(err);
                res.status(500).send({ success: false, message: "Something went wrong!" }) 
            }else{
                 res.status(200).send({ success: true})
            }
         })
    }}catch(err){
        console.log(err)
         res.status(500).send({ success: false, message: "Something went wrong!" })

    }

}
async function sendOTPforSignup(req, res) {
    try {
        let otp = Math.floor(Math.random() * 9000) + 1000
        let msg = "Dear User,one time password for email verificatio is " + otp;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
             auth:{
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
        })
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Regarding OTP for your Account Creation on Task Manager',
            text: msg
        };
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send({ success: false, message: "Something went wrong!" })
            } else {
                res.status(200).send({ success: true, data: otp })
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Something went wrong!" })
    }
}

async function userLogin(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(401).send({ success: false, message: "Invalid Email/Password" })
        } else {
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                user.lastLogin = new Date();
                await user.save();
                let token = jwt.sign( { userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
                let data = {
                    name: user.name,
                    email: user.email,
                    token: token
                }
                res.status(200).send({ success: true, data: data })
            } else {
                res.status(401).send({ success: false, message: "Invalid Email/Password"  })
            }
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Server error" });
    }

}
module.exports={
    addUser,
    sendOTPforSignup,
    userLogin
}