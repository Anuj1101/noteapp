const mongoose=require('mongoose')
const dotenv=require('dotenv');
const path=require('path')
dotenv.config({path:path.resolve(__dirname,'../../.env')});
//function to connect database
async function connectDB(){
try{
await mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:5000})
console.log("database connected successfully");
}
catch(err){
    console.log("got an error:",err.message);
}
}
//calling the function 
module.exports=connectDB;