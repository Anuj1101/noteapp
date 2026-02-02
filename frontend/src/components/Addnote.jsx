import { useState } from "react";
import API from "../services/api";
function Addnote(){
const uname= localStorage.getItem('username');
const [desc,setDesc]=useState('');
const [title,setTitle]=useState('');
const handleSubmit=async ()=>{
    try{
    const res=await API.post('/addnote',{uname,desc,title});
    alert('new note added')
    }
    catch(err){
        alert('got some error in execution');
        console.log(err);
    }
}
return(
    <div className="form">
        <input type="text" placeholder="enter the note title" onChange={(e)=>{setTitle(e.target.value)}}/>
        <br />
        <input type="text" placeholder="enter the note description" onChange={(e)=>{setDesc(e.target.value)}}/>
        <br />
        <button onClick={handleSubmit}>submit</button>
    </div>
)
}
export default Addnote;