import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate;
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/lodgings">lodgings</Link>
      </li>
      <li className="navbar-item">
        <Link to="/matches">Matches</Link>
      </li>
      <li className="navbar-item">
        <Link to="/trips">Trips</Link>
      </li>
      {localStorage.getItem('honey_user') ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem('honey_user');
              navigate('/', { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ''
      )}
    </ul>
  );
};
