import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    let res = await axios.post("http://localhost:5000/users/login",{
        
          email: email,
          password: password
        
    });
    // let res = await axios.get("http://localhost:5000/users/getalluser");
    console.log(res);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div style={{  padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
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
                onChange={(e)=>{setEmail(e.target.value)}}
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
                  onChange={(e)=>{setPassword(e.target.value)}}
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
            <button type="submit" className="primary">
              Login
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </main>
      </div>
    </div>
  );
};

export default Login;
