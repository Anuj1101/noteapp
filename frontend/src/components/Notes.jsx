import { useEffect, useState } from "react";
import API from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import Addnote from "./Addnote";
import './Notes.css'

function Notes() {
  const [notes, setNotes] = useState([]);
  const [falert,setFalert] = useState('');
  const navigate = useNavigate();

  // redirect if not logged in
  if (!username) {
    return <Navigate to="/login" replace />;
  }
  const fetchNotes = async () => {
    try {
      const res = await API.get(`/notes`);
      setNotes(res.data);
    } catch (err) {
      setFalert("Error fetching notes");
      console.error(err);
    }
  };
  const deleteNote=async(id)=>{
    const res =await API.delete(`/deletenote/${id}`)
    setFalert(res.data.message);
  }
  useEffect(() => {
    fetchNotes();
  }, [username,deleteNote]);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login", { replace: true });
  };

  return (
    <div className="mainpage">
      <div className="navbar">
      <h2 className="mainheading">{username}'s notes:</h2>
      <button className="nav-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="two-split">
      {notes.length === 0 ? (<p>No notes found</p>):
      (<div className="notes">
      {notes.map((note) => (
        <div key={note._id}>
          <h4>{note.noteTitle}</h4>
          <p>{note.noteDesc}</p>
          <button className="nav-btn" onClick={()=>deleteNote(note._id)}>delete</button>
          <br />
        </div>
      ))}
      </div>)}

      <Addnote refreshNotes={fetchNotes} newMessage={setFalert}/>
      </div>
      <div>{falert}</div>
    </div>
  );
}

export default Notes;
