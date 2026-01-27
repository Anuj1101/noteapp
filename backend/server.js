const express=require('express');
const mongoose=require('mongoose');
const User=require('./schemas/user');
const connectDB=require('./connections/dbconn');
connectDB();
const port=2400;
const app=express();
app.use(express.json());
//entry point
app.get('/',(req,res)=>{
    res.status(200).send({message:'you have entered the web development journey'})
})
//api to register
app.post('/register',async(req,res)=>{
    const {username,email,password} = req.body;
    if(!await User.findOne({email:email})){
    const user=new User({
        username:username,
        email:email,
        password:password
    })
    await user.save();
    res.status(201).send({message:"new user created successfully"})}
})
//api to login
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400).send({message:"it is cumpolsury to enter email and password"});
        return;
    }
    else{
        const cuser=await User.findOne({email:email});
        if(!cuser){
            res.status(400).send({message:"no user found"})
        }
        else{
            if(cuser.password==password){
            res.status(200).send({message:`${cuser.username} logged in successfully`})
            }
            else{
                res.status(400).send({message:"password incorrect"})
            }
        }
    }
})
app.listen(port,()=>{console.log("server is running successfully on port number "+port)});