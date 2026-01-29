import { useState } from "react";
import API from "../services/api";
function Register(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [rpassword,setRpassword]=useState('');
    const [email,setEmail]=useState('');
    const handleRegister=async()=>{
        try{
            if(password===rpassword){
            const res=await API.post('/register',{username,email,password})
            alert(res.data.message)
        }
        else{
            alert("both password didn't matched")
            return;
        }
        }
        catch(err){
            alert(err)
        }
    }
    return(
        <div>
            <h2>Register page</h2>
            <input type="text" placeholder="enter username" onChange={(e)=>setUsername(e.target.value)}/>
            <br />
            <input type="email" placeholder="enter email" onChange={(e)=>setEmail(e.target.value)}/>
            <br />
            <input type="password" placeholder="enter password" onChange={(e)=>setPassword(e.target.value)}/>
            <br />
            <input type="password" placeholder="re-enter password" onChange={(e)=>setRpassword(e.target.value)}/>
            <br />
            <button onClick={handleRegister}>click to register</button>
        </div>
    )
}
export default Register;