import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    fetch('http://localhost:8088/users')
      .then((res) => res.json())
      .then((users) => {
        if (users.some((user) => user.email === email)) {
          alert('Email already registered. Please log in instead.');
          return;
        }

        const newUser = { username: name, email, password };

        fetch('http://localhost:8088/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((savedUser) => {
            alert('Registration successful. Please log in.');
            // optional: auto login
            // localStorage.setItem('user', JSON.stringify(savedUser));
            // navigate('/');
            navigate('/');
          });
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};
