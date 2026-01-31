import { useEffect,useState } from "react";
import API from "../services/api";
import { Link, Navigate } from "react-router-dom";
function Notes(){
    const [notes,setNotes]=useState([]);
    const username=localStorage.getItem('username');
    if(!username)return <Navigate to="/login" replace/>
    //starting useEffect block
    useEffect(()=>{
    const storeData=async()=>{
        try{
        if(!username)return;
        const res=await API.get(`/notes/${username}`);
        setNotes(res.data)}
        catch(err){
            alert('got some error fetching notes');
            console.log(err)
        }
    }
    storeData();
    },[username]);
    //logout function
    const handleLogout=()=>{
        localStorage.removeItem('username');
        <Navigate to='/login' replace/>
    }
    //return section
    return(
        <div>
            <h2>{username}'s notes:-</h2>
            {notes.length===0&&<p>no notes found</p>}
            {notes.map((note)=>(
                <div key={note._id}>
                    <h4>{note.noteTitle}</h4>
                    <p>{note.noteDesc}</p>
                    <hr />
                </div>
            ))}
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}
export default Notes;