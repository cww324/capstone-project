import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/trips">Trips</Link>
      <Link to="/matches">Matches</Link>
      <Link to="/lodgings">Lodgings</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};
