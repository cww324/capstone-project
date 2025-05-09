import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home.jsx';
import { Trips } from './pages/Trips.jsx';
import { Matches } from './pages/Matches.jsx';
import { Lodgings } from './pages/Lodgings.jsx';
import { Login } from './auth/Login.jsx';
import { Register } from './auth/Register.jsx';
import { Navbar } from './components/Navbar.jsx';

export const App = () => {
  const isLoggedIn = localStorage.getItem('user');

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/lodgings" element={<Lodgings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
};
