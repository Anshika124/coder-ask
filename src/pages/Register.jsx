import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { isDebug } from '../controller/ProjectData';



const Registration = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessageUsername, setErrorMessageUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        let res = await axios.post("http://localhost:5000/users/register", {
            fullName: fullname,
            userName: username,
            email: email,
            password: password
        })
        setLoading(false);
        if (res.data.success) {
            navigate('/');
        }
        else {

            if (res.data.value === "email") {
                setErrorMessageEmail(res.data.message);
            }
            else {
                setErrorMessageEmail("");
            }
            if (res.data.value === "username") {
                setErrorMessageUsername(res.data.message);
            }
            else {
                setErrorMessageUsername("");
            }
        }
        if (isDebug) {
            console.log(res);
        }

    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {loading ? <ReactLoading type={'spin'} color={'#ffffff'} height={'15%'} width={'15%'} /> : <div style={{ padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
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
                                value={fullname ? fullname : ""}
                                required
                                onChange={(e) => { setFullname(e.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={username ? username : ''}
                                required
                                onChange={(e) => { setUsername(e.target.value) }}
                            />
                        </div>
                        {errorMessageUsername && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{errorMessageUsername}</div>}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email ? email : ''}
                                required
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        {errorMessageEmail && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{errorMessageEmail}</div>}

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password ? password : ''}
                                    required
                                    style={{ flex: 1 }}
                                    onChange={(e) => { setPassword(e.target.value) }}
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
                                    value={confirmPassword ? confirmPassword : ''}
                                    style={{ flex: 1 }}
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
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
            </div>}
        </div>
    );
};

export default Registration;
