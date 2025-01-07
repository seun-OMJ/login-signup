import React, { useState } from 'react';
import "./Signup.css";
export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    reenterPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(null); // Tracks match state
  const [passwordValid, setPasswordValid] = useState(true); // Tracks validity of password rules
  const [emailValid, setEmailValid] = useState(true);
  // Regex for password validation: At least 1 uppercase, 1 lowercase, 1 number, 1 special character, and min length of 8
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "password") {
      setPasswordValid(passwordRegex.test(value)); // Validate password rules
      setPasswordMatch(value === formData.reenterPassword); // Check match
    } else if (id === "reenterPassword") {
      setPasswordMatch(value === formData.password); // Check match
    } else if(id === "email"){
      setEmailValid(emailRegex.test(value));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password} = formData;

    if (!passwordValid) {
      alert("Password does not meet the requirements.");
      return;
    }

    if (!passwordMatch) {
      alert("Passwords do not match!");
      return;
    }


    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className='signupBody'>
      <div className='signupContainer'>
        <form onSubmit={handleSubmit}>
          <div class="input-group">
            <label className="firstname" for="firstname">Firstname </label>
            <br></br>
            <input type="text" id="firstname" placeholder="Enter your firstname" required value={formData.firstname} onChange={handleInputChange} /><br></br>
          </div>
          <div class="input-group">
            <label className="lastname" for="lastname">Lastname </label>
            <br></br>
            <input type="text" id="lastname" placeholder="Enter your lastname" required value={formData.lastname} onChange={handleInputChange} /><br></br>
          </div>
          <div class="input-group">
            <label className="email" for="email">Email </label>
            <br></br>
            <input type="email" id="email" placeholder="Email" required value={formData.email} onChange={handleInputChange} /> {!emailValid && (
                <p className="error-text">
                  Email should be of the form: "username@domain.com"
                </p>
              )}<br></br>
          </div>
          <div class="input-group">
            <label className="password" for="password">Password </label>
            <br></br>
            <input type="password" id="password" placeholder="Password" style={{
                borderColor: passwordValid ? "#ccc" : "red", // Red if password invalid
              }} required value={formData.password} onChange={handleInputChange} /> {!passwordValid && (
                <p className="error-text">
                  Password must be at least 8 characters and include uppercase,
                  lowercase, number, and special character.
                </p>
              )}<br></br>
          </div>
          <div class="input-group">
            <label className="reenterPassword" for="reenterPassword">re-enter password </label>
            <br></br>
            <input type="password" id="reenterPassword" placeholder="Re-enter password" style={{
                borderColor: passwordMatch === null ? "#ccc" : passwordMatch ? "green" : "red",
              }} required value={formData.reenterPassword} onChange={handleInputChange}  />        {/* Error paragraph shows dynamically based on match condition */}
              {passwordMatch === false && (
                <p id="error-message" style={{ color: "red" }}>
                  Passwords do not match.
                </p>
              )}<br></br>

            <button className='submit-button' type="submit"><strong>Sign up</strong></button>
          </div>

        </form>
      </div>
    </div>
  )
}
