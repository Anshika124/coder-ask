import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@picocss/pico/css/pico.min.css';
import { localDBUrl } from '../controller/URLManager';
import Loading from '../components/Loading';


const Login = ({setIsLoggedIn}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post(localDBUrl+"/users/login", {
        email: email,
        password: password
      });
      setLoading(false);
      if (res.data.success) {
        // Handle successful login here
        setIsLoggedIn(true);
        localStorage.setItem("userData", JSON.stringify(res.data.value));
        Navigate('/')
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials and try again.");
      console.error(error);
    }
  };

  useEffect(()=>{
    if (localStorage.getItem("userData") && localStorage.getItem("userData") !== '{}')
    {
      setIsLoggedIn(true);
      Navigate('/');
    }
  }, [])

  if (loading ) {
    return <Loading/>
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {
        
        <div style={{ padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
        <header className="header">
          <h1>Login</h1>
        </header>
        <main>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email-username">Email or Username</label>
              <input
                type="text"
                id="email-username"
                name="email-username"
                placeholder="Enter your email or username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  style={{ flex: 1 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{ marginLeft: '10px', padding: '0.5em', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9em' }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {errorMessage && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</div>}
            <button type="submit" className="primary">
              Login
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </main>
      </div>
      }
    </div>
  );
};

export default Login;
