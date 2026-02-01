import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert,setAlert]=useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setAlert("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/login", { email, password });
      localStorage.setItem("username", res.data.username);
      navigate("/notes", { replace: true });
    } catch (err) {
      setAlert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">NoteFlow</div>
        <Link to="/register" className="nav-btn">Create Account</Link>
      </nav>

      {/* Main Content */}
      <div className="content">
        {/* Left */}
        <div className="hero">
          <h1>NoteFlow</h1>
          <p className="subtitle">
            Simple, secure notes for everyday productivity.
          </p>
          <p className="description">
            Built with the MERN stack. Access your notes anywhere.
          </p>
        </div>

        {/* Right */}
        <div className="login-box">
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {setEmail(e.target.value)
            setAlert('')
            }}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {setPassword(e.target.value)
              setAlert('')
            }}
          />
          <p>{alert}</p>
          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="register-text">
            New user? <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
