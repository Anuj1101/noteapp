import { useState } from "react";
import API from "../services/api";
import { useNavigate,Link } from "react-router-dom";
import './Register.css'

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password || !rpassword) {
      alert("All fields are required");
      return;
    }

    if (password !== rpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/register", {
        username,
        email,
        password,
      });

      alert(res.data.message);

      // redirect to login
      navigate("/login",{replace:true});
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="mainpage">
      <div className="navbar">
      <h2>Register page</h2>
      </div>
      <div className="forms">
      <input
        type="text"
        placeholder="enter username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <input
        type="email"
        placeholder="enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="re-enter password"
        onChange={(e) => setRpassword(e.target.value)}
      />
      <br />

      <button onClick={handleRegister}>Register</button>
      <p>already have an account?<Link to='/login'>go to login</Link></p>
    </div>
    </div>
  );
}

export default Register;
