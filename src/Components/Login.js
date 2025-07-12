import React, { useState } from 'react';
import './login.css';
import { Stethoscope } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (email === 'staff@clinic.com' && password === '123456') {
      window.localStorage.setItem('isLoggedIn', 'true'); 
      alert('Login successful! Welcome to the Clinic Dashboard.');
        onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo-circle">
            <Stethoscope size={28} color='blue' strokeWidth={2.5}/>
        </div>
        <h2>Clinic Calendar</h2>
        <p className="subtitle">Sign in to manage appointments</p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="staff@clinic.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
        </form>

        <p className="demo-info">
          Demo credentials: <strong>staff@clinic.com</strong> / <strong>123456</strong>
        </p>
      </div>
    </div>
  );
}