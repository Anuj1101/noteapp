const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const User=require('./schemas/user');
const note=require('./schemas/note');
const connectDB=require('./connections/dbconn');
connectDB();
const port=2400;
const app=express();
app.use(cors())
app.use(express.json());
//entry point
app.get('/notes/:uname',async(req,res)=>{
    const {uname}=req.params;
    const data=await note.find({username:uname})
    res.status(200).send(data);
})
//api to register
app.post('/register',async(req,res)=>{
    try{
    const {username,email,password} = req.body;
    if(!await User.findOne({email:email})){
    const user=new User({
        username:username,
        email:email,
        password:password
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
            if(cuser.password==password){
            res.status(200).send({message:`${cuser.username} logged in successfully`,
        username:cuser.username})
            }
            else{
                res.status(400).send({message:"password incorrect"})
            }
        }
    }
})
//inserting the data
app.post('/addnote',async(req,res)=>{
    const{uname,title,desc}=req.body;
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