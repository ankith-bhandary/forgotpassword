const mongoose=require("../utils/dbconfig")
const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{ type:String,
    unique:true},
    password:{type:String},
    //category:{type:String},
    resetPasswordToken:{type:String},
    resetPasswordExpires:{type:Number}

})


let lea=mongoose.model('users',userSchema)
module.exports=lea