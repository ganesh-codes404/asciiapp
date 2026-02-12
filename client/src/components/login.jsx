import React, { useState } from "react";
import "./login.css";
import logo from "../assets/pic.jpg";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login — always succeeds
    if (email.length > 0 && password.length > 0) {
      onLogin(); // Notify app that login succeeded
    }
  };

  return (
<div className="login-container">
    
  <form className="login-box" onSubmit={handleSubmit}>
    
    <img
      src={logo}
      className="login-logo"
      alt="logo"
    />

    <h2>Welcome to Pickxel</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="signup-text">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
