import axios from "axios";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Login.css";
export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", {
                email: userName,
                password,
            });
            alert(response.data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };
    return (
        <div className='body'>
            <div className='container'>
                <form onSubmit={handleLogin}>
                    <div class="input-group">
                        <label className="usernameLabel" for="username">Username </label>
                        <br></br>
                        <input type="text" id="username" placeholder="Enter your username" value={userName} onChange={(e) => setUserName(e.target.value)} required /><br></br>
                    </div>

                    <div class="input-group">
                        <br></br>
                        <label className='passwordLabel' for="password">Password </label>
                        <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <br></br><a className="forgotPassword" href='reset'>Forgot password? </a>
                    </div>
                    <button className='submit-button' type="submit" ><strong>Login</strong></button>
                </form>

            </div>
            <div className='containerTwo'>
                Don't have an account? <Link to="/signup">Sign Up</Link></div>

        </div>
    )
}
