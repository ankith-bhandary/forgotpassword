const express=require("express")

const app=express()

const forget=require("./routes/forgetpassword")
const reset=require("./routes/reset")
const updatevia=require("./routes/updateviaemail.js")

app.use(express.json());
app.use(express.urlencoded({
    extended:'true'
}));

app.use("/",forget)
app.use("/",reset)
app.use("/",updatevia)

//console.log(token)
app.listen(process.env.PORT || 6000,function(){
   console.log("Started on port 6000");
});

