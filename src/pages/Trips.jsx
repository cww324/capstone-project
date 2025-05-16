// src/pages/Trips.jsx
import { useEffect, useState } from "react";
import { TripCard } from "../components/TripCard";
import { useUser } from "../hooks/useUser";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Trips = () => {
  const { currentUser } = useUser();
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8088/trips?_expand=match&_expand=user")
      .then((res) => res.json())
      .then(setTrips);
  }, []);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Trips</h2>
        <Button variant="success" onClick={() => navigate("/trips/create")}>
          Create New Trip
        </Button>
      </div>

      {trips.length === 0 ? (
        <p>No trips available yet.</p>
      ) : (
        trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} currentUser={currentUser} />
        ))
      )}
    </Container>
  );
};
