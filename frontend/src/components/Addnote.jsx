import { useRef, useState } from "react";
import API from "../services/api";

function Addnote({ refreshNotes,newMessage}) {
  const uname = localStorage.getItem("username");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const titleRef=useRef(null);
  const descRef=useRef(null);
  
  const handleRef=(e,nxtRef)=>{
    if(e.key === 'Enter'){
      e.preventDefault();
      if(nxtRef){
        nxtRef.current.focus();
      }
      else{
        handleSubmit(e);
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/addnote", {
        uname,
        desc,
        title,
      });

      refreshNotes();
      newMessage("new note added");
      setDesc("");
      setTitle("");
      titleRef.current.focus();
    } catch (err) {
      newMessage("got some error in execution");
      console.log(err);
    }
  };

  return (
    <div className="forms">
      <h4 className="mainheading">ADD NOTES:-</h4>

      <input
        ref={titleRef}
        type="text"
        placeholder="enter the note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) =>handleRef(e,descRef)}
      />

      <br />

      <input
      ref={descRef}
        type="text"
        placeholder="enter the note description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        onKeyDown={(e)=>handleRef(e,null)}
      />

      <br />

      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default Addnote;
