const password=require('./schema');

module.exports.searchparams=async function(reset){
    try{
        var result=password.findOne({resetPasswordToken:reset});
      
        
        return result;
    }catch(error){
        console.log(error);
    }
}
