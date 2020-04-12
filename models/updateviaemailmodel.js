const password1=require('./schema');

module.exports.finddetail=async function(emailid){
    try{
        var result=password1.findOne({email:emailid});
        return result;
    }catch(error){
        console.log(error);
    }
}

module.exports.passupdate=async function(emailid,hashedpass){
    try{
        var update1=password1.findOneAndUpdate({
            email:emailid
        },{
            password:hashedpass,
            resetPasswordToken:null,
            resetPasswordExpires:null
        },
        {new:true}
        );
        console.log("updation done");
        return update1;
    }catch(error){
        throw new Error(error);
    }
}