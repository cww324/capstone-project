// src/App.jsx
import { Navigate, Route, Routes } from 'react-router-dom';
import './src/App.css';
import { Home } from './pages/Home';
import { TripsForMatch } from './pages/TripsForMatch';
import { Matches } from './pages/Matches';
import { Lodgings } from './pages/Lodgings';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Navbar } from './components/Navbar';
import { Trips } from './pages/Trips';
import { CreateTrip } from './pages/CreateTrip.jsx';

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
            <Route path="/trips/create" element={<CreateTrip />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/matches/:matchId" element={<TripsForMatch />} />{' '}
            <Route path="/lodgings" element={<Lodgings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
};
