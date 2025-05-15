import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8088/users')
      .then((res) => res.json())
      .then((users) => {
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/');
          window.location.reload(); // Optional: forces Navbar etc. to refresh
        } else {
          alert('Invalid email or password. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};
