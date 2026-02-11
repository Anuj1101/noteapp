const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const cors=require('cors')
const User=require('./schemas/user');
const note=require('./schemas/note');
const connectDB=require('./connections/dbconn');
connectDB();
const port=2400;
const app=express();
app.use(cors())
app.use(express.json());
const verifyToken=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader)return res.status(401).send({message:'authorization header missing'});
    const token=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).send({message:'invalid token'});
    }
}
//entry point
app.get('/notes',verifyToken,async(req,res)=>{
    const uname=req.user.username;
    const data=await note.find({username:uname})
    res.status(200).send(data);
})
//api to register
app.post('/register',async(req,res)=>{
    try{
    const {username,email,password} = req.body;
    if(!await User.findOne({email:email})){
    const bpassword=await bcrypt.hash(password,10)
    const user=new User({
        username:username,
        email:email,
        password:bpassword
    }
    ) 
    await user.save();
    res.status(201).send({message:"new user created successfully"})}
    else{
        return res.status(409).send({message:'user already exist'})
    }
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"something broke"})
    }
})
//login
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).send({message:"it is cumpolsury to enter email and password"});

    }
    else{
        const cuser=await User.findOne({email:email});
        if(!cuser){
            res.status(400).send({message:"no user found"})
        }
        else{
            const isMatched= await bcrypt.compare(password,cuser.password)
            if(isMatched){
            const token=await jwt.sign({userid:cuser._id,username:cuser.username},
                process.env.JWT_SECRET,
                {expiresIn:"1h"})
            res.status(200).send({message:`${cuser.username} logged in successfully`,
        token})
            }
            else{
                res.status(400).send({message:"password incorrect"})
            }
        }
    }
})
//inserting the data
app.post('/addnote',verifyToken,async(req,res)=>{
    const uname=req.user.username;
    const{title,desc}=req.body;
    if(!uname||!title||!desc){
        return res.status(400).send({message:'username , title or description is missing'})
    }
    else{
        if(await User.findOne({username:uname})){
            await note.create({username:uname,noteTitle:title,noteDesc:desc})
            res.status(201).send({message:"new note inserted successfully"})
        }
        else{
            res.status(400).send({message:"user not found"});
        }
    }
})
//jhbgas
app.delete('/deletenote/:id',async(req,res)=>{
    const id=req.params.id;
    if(!id){
        return res.status(400).send({message:"you have not entered either name or note"})
    }
    const result=await note.deleteOne({_id:id})
    if(result.deletedCount === 0){
        return res.status(400).send({message:'we couldnt delete'})
    }
    res.status(201).send({message:'note deleted successfully'})
})
app.listen(port,()=>{console.log("server is running successfully on port number "+port)});