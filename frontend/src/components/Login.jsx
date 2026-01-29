import { useState } from "react";
import API from "../services/api";
function Login(){
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const handleLogin=async ()=>{
        try{
            const res =await API.post("/login",{email,password});
            //storing usernaame
            localStorage.setItem('username',res.data.username)
            alert(res.data.message);
        }
        catch(err){
            alert(err||'error');
        }
    }
    return(
        <div>
            <h2>Login page</h2>
            <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleLogin}>submit</button>
        </div>
    )
}
export default Login;