import { useEffect,useState } from "react";
import API from "../services/api";
function Notes(){
    const [notes,setNotes]=useState([]);
    const username=localStorage.getItem('username');
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
        </div>
    )
}
export default Notes;