// src/App.jsx
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Trips } from './pages/Trips';
import { Matches } from './pages/Matches';
import { Lodgings } from './pages/Lodgings';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Navbar } from './components/Navbar';

export const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      {user && <Navbar />}
      <Routes>
        {!user ? (
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
