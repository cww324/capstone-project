// src/components/Navbar.jsx
import { useNavigate, Link } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/lodgings">Lodgings</Link>
      </li>
      <li className="navbar-item">
        <Link to="/matches">Matches</Link>
      </li>
      <li className="navbar-item">
        <Link to="/trips">Trips</Link>
      </li>
      {localStorage.getItem('user') && (
        <li className="navbar-item navbar-logout">
          <button onClick={handleLogout}>Logout</button>
        </li>
      )}
    </ul>
  );
};
