const express=require("express")
const router=express.Router();
const  updateviaemail=require('../models/updateviaemailmodel');
const bcrypt=require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;

router.post('/update',async (req,res)=>{
    try{
        console.log("enter into the route");
        let { email,password}=req.body;
        console.log(email);
        console.log(password)
        let result= await updateviaemail.finddetail(email);
        console.log(result);
        console.log("data extracted");
        if(result!==null){
            console.log("user exists in database");
           let hashedpassword= await bcrypt.hash(password,BCRYPT_SALT_ROUNDS);
           console.log(hashedpassword);
            let passupdation= await updateviaemail.passupdate(email,hashedpassword);
            console.log("updation done");
            if(passupdation.password===hashedpassword){
                res.send("Updation done properly");
                console.log("updation done properly");
            }
            else{
                console.log("Couldnt update properly");
            }
            
        }
        else{
            console.log("Updation not done properly");
            res.send("Updation not done properly")
        }

    }catch(error)
    {
        console.log(error);
    }
        

})

module.exports=router;
