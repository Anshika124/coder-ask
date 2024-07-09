import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const Registration = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async(e) => {
        e.preventDefault();
        let res = await axios.post("http://localhost:5000/users/register",{
            fullName: fullname,
            userName: username,
            email:email,
            password: password
        })
        console.log(res);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
                <header className="header">
                    <h1>Register</h1>
                </header>
                <main>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="fullname">Full Name</label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                placeholder="Enter your full name"
                                required
                                onChange={(e)=>{setFullname(e.target.value)}}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                required
                                onChange={(e)=>{setUsername(e.target.value)}}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
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
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm-password"
                                    name="confirm-password"
                                    placeholder="Confirm your password"
                                    required
                                    style={{ flex: 1 }}
                                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{ marginLeft: '10px', padding: '0.5em', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9em' }}
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="primary">
                            Register
                        </button>
                    </form>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </main>
            </div>
        </div>
    );
};

export default Registration;
