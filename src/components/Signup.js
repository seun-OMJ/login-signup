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
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, reenterPassword } = formData;

    if (password !== reenterPassword) {
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
            <input type="text" id="lastname" placeholder="Enter your lastname" required value={formData.lastname} onChange={handleInputChange}/><br></br>
          </div>
          <div class="input-group">
            <label className="email" for="email">Email </label>
            <br></br>
            <input type="email" id="email" placeholder="Email" required value={formData.email} onChange={handleInputChange} /><br></br>
          </div>
          <div class="input-group">
            <label className="password" for="password">Password </label>
            <br></br>
            <input type="password" id="password" placeholder="Password" required value={formData.password} onChange={handleInputChange}/><br></br>
          </div>
          <div class="input-group">
            <label className="reenterPassword" for="reenterPassword">re-enter password </label>
            <br></br>
            <input type="password" id="reenterPassword" placeholder="Re-enter password" required value={formData.reenterPassword} onChange={handleInputChange}/><br></br>

            <button className='submit-button' type="submit"><strong>Sign up</strong></button>
          </div>

        </form>
      </div>
    </div>
  )
}
