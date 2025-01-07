import React, { useState } from "react";
import "./ForgotPassword.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); // New state to track success/failure



    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setMessage(""); // Clear any previous messages

        try {
            
            const response = await fetch("http://localhost:5000/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setMessage(result.message || "A reset link has been sent to your email.");
            } else {
                setIsSuccess(false);
                setMessage(result.message || "Email not found in our records.");
            }
        } catch (err) {
            setIsSuccess(false);
            setMessage("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="body">
            <div className="forgotPasswordContainer">
                <form onSubmit={handleSubmit}>
                    <h2>Forgot Password?</h2>

                    <div class="input-group">
                        <label className="emailLabel" for="email">Provide your account email to recieve reset link </label>
                        <br></br>
                        <input type="email" id="email" placeholder="Email" requiredvalue={email}
                            onChange={(e) => setEmail(e.target.value)} /><br></br>
                    </div>

                    <button className="submit-button" type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Send Reset Link"}
                    </button>

                    {message && <p style={{ color: isSuccess ? "green" : "red" }} className="message">{message}</p>}
                </form>
            </div>
        </div>

    );
}

