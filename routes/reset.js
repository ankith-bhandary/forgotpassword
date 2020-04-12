const express=require("express")
const router=express.Router();
const  reset=require('../models/resetmodel');

router.get('/reset',async(req,res)=>{
    try{
        let resetpassword=req.query.resetPasswordToken;
        console.log(resetpassword);
    let result=await reset.searchparams(resetpassword);
    console.log("This is the result")
    console.log(result);
    
    if(result!==null){
        let diff=Date.now()-result.resetPasswordExpires;
        console.log(diff);
        if(diff>0){
            res.status(200).send({
                message:"password link a-ok",
                email:result.email
                })
        }
        else{
            console.log("password reset link is invalid or expired")
        res.status(403).send("password reset link is invalid or expired")
        }
        
        
    }else{
        console.log("password reset link is invalid or expired")
        res.status(403).send("password reset link is invalid or expired")
    
    }
        
        
    }catch(error){
        console.log(error);
    }
    
})

module.exports=router;