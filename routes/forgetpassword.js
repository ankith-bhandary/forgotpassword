const express=require('express');
const router=express.Router();
//require("dotenv").config()
const crypto=require("crypto")

const nodemailer=require("nodemailer")
const forgotpassword=require("../models/forgetpasswordmodel");

router.post("/forgot",async(req,res)=>
{
    try{
        if(req.body.email===" "){
            console.log("No email found");
            res.status(400).send("Email required");
        }
        let{ email }=req.body;
        console.log(email);
        console.log("email destructured")
        let emailid= await forgotpassword.emailcheck(email);
        console.log(emailid);
        if(emailid===null){
            console.log("email not in database");
            res.status(403).send("email not in database");
        }else{
            console.log("email checked");
            const token=crypto.randomBytes(20).toString("hex");
            console.log("go to update");
            let updated= await forgotpassword.emailupdate(email,token);
            console.log("updation done properly");
            const transporter=nodemailer.createTransport({
                host:"smtp.gmail.com",
                port:587,
                secure:false,
                auth:{
                    user:'sushmitashetty2017@gmail.com',
                    pass:'goodluck123'
                },
                tls:{rejectUnauthorized:false
                }
            })
            console.log("transporter is also done");
            const mailoptions={
                from:"sushmitashetty2017@gmail.com",
                to:`${emailid.email}`,
                subject:"Link to Reset Password",
                text:`http://localhost:3000/reset/${token}\n\n`,
                
            }
            console.log("mailoptions done properly");
            transporter.sendMail(mailoptions,(err,res)=>{
                if(err){
                    console.log("there was a error",err)
                }else{
                    console.log("Here is a response",res);
                    res.status(200).json("recovery mail sent");
                    res.json({key:"mailsent"});
                }
            })
            console.log("mail sent !!!!!")

        }

    }catch(error){
        console.log(error);
    }
});
module.exports=router;