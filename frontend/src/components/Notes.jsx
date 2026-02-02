import { useEffect, useState } from "react";
import API from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import Addnote from "./Addnote";
import './Notes.css'

function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // redirect if not logged in
  if (!username) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get(`/notes/${username}`);
        setNotes(res.data);
      } catch (err) {
        alert("Error fetching notes");
        console.error(err);
      }
    };

    fetchNotes();
  }, [username]);

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
      {notes.length === 0 && <p>No notes found</p>}
      <div className="notes">
      {notes.map((note) => (
        <div key={note._id}>
          <h4>{note.noteTitle}</h4>
          <p>{note.noteDesc}</p>
          <hr />
        </div>
      ))}
      </div>

      <Addnote />
      </div>
    </div>
  );
}

export default Notes;
