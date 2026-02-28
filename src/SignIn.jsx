import React, { useState } from "react";
import "./App.css";

const SignIn = ({ onLogin }) => {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name) {
      alert("Enter your name");
      return;
    }
    onLogin(name);
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1>✨ Shriya Writes</h1>
        <h2>Welcome 👋</h2>
        <p>Sign in to continue</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
};

export default SignIn;