// src/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import "./css/App.css";
import { Home } from "./pages/Home";
import { TripsForMatch } from "./pages/TripsForMatch";
import { Matches } from "./pages/Matches";
import { Lodgings } from "./pages/Lodgings";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Navbar } from "./components/Navbar";
import { Trips } from "./pages/Trips";
import { CreateTrip } from "./pages/CreateTrip.jsx";
import { TripDetail } from "./pages/TripDetail.jsx";
import { CreateTripForMatch } from "./pages/CreateTripsForMatch.jsx";
import { MyTrips } from "./pages/MyTrips.jsx";
import { EditTrip } from "./pages/EditTrip.jsx";

export const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

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
            <Route path="/trips/:tripId" element={<TripDetail />} />
            <Route path="/trips/create" element={<CreateTrip />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/matches/:matchId" element={<TripsForMatch />} />{" "}
            <Route path="/my-trips" element={<MyTrips />} />
            <Route
              path="/matches/:matchId/create"
              element={<CreateTripForMatch />}
            />
            <Route path="/edit-trip/:tripId" element={<EditTrip />} />
            <Route path="/lodgings" element={<Lodgings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
};
