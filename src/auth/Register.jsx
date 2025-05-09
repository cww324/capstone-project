// src/auth/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Fetch current users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the email is already registered
    if (users.some((user) => user.email === email)) {
      alert('Email already registered. Please login instead.');
      return;
    }

    // Add the new user
    const newUser = { id: users.length + 1, name, email, password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    alert('Registration successful. Please log in.');
    navigate('/');
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};
