import { useState } from "react";
import API from "../services/api";

function Addnote({ refreshNotes }) {
  const uname = localStorage.getItem("username");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // good practice

    try {
      await API.post("/addnote", {
        uname,
        desc,
        title,
      });

      refreshNotes(); // ✅ now this works

      alert("new note added");
      setDesc("");
      setTitle("");
    } catch (err) {
      alert("got some error in execution");
      console.log(err);
    }
  };

  return (
    <div className="forms">
      <h4 className="mainheading">ADD NOTES:-</h4>

      <input
        type="text"
        placeholder="enter the note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="enter the note description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <br />

      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default Addnote;
